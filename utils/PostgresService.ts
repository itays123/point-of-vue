import {
  articleDao,
  Comment,
  Article,
  ArticleWithContent,
  Author,
} from "../types.ts";
import { Client, QueryResult, readFileStr } from "../deps.ts";
import "https://deno.land/x/dotenv/load.ts";

class DB {
  private db: Client;
  constructor() {
    const database = new Client({
      user: "postgres",
      database: "pov",
      hostname: "localhost",
      password: Deno.env.get("PASSWORD")!,
      port: 5432,
    });
    this.db = database;
  }
  async connect() {
    await this.db.connect();
  }

  private mapRows(result: QueryResult): any[] {
    let objects: any[] = [];

    result.rows.forEach((row: any) => {
      let obj: any = {};

      result.rowDescription.columns.forEach((column: any, index: number) => {
        obj[column.name] = row[index];
      });

      objects.push(obj);
    });

    return objects;
  }
  async query(query: { text: string; args: any[] } | string): Promise<any> {
    const result = await this.db.query(query);
    const data = this.mapRows(result);
    return data;
  }
}

export class PostgresService implements articleDao {
  private db: DB;
  constructor() {
    this.db = new DB();
  }
  static async newInstance(): Promise<PostgresService> {
    const service = new PostgresService();
    await service.connect();
    return service;
  }
  async connect() {
    await this.db.connect();
    return this;
  }
  private async withAuthorAndImage(articles: any[]): Promise<Article[]> {
    type inputType = {
      id: number;
      title: string;
      authorid: number;
      timepublished: string;
      imageurl: string;
    };
    const authors: Author[] = await this.db.query("SELECT * FROM authors");
    const findAuthor = (authorId: number): Author =>
      authors.find((a) => a.id === authorId)!;

    return articles.map((
      { id, title, authorid, timepublished, imageurl }: inputType,
    ) => ({
      id,
      title,
      timePublished: timepublished,
      imageUrl: `https://images.pexels.com/photos/${imageurl}`,
      author: findAuthor(authorid),
    }));
  }
  async getAllArticles(): Promise<Article[]> {
    const articles: any[] = await this.db.query(
      "SELECT id, title, authorId, timePublished, imageUrl FROM articles ORDER BY timePublished DESC",
    );
    return await this.withAuthorAndImage(articles);
  }
  async getArticlesByCategory(categoryId: number): Promise<Article[]> {
    const articles: any[] = await this.db.query({
      text:
        "SELECT id, title, authorId, timePublished, imageUrl FROM articles WHERE categories LIKE $1 ORDER BY timePublished DESC",
      args: [`%${categoryId}%`],
    });
    return await this.withAuthorAndImage(articles);
  }
  async getArticlesByAuthor(authorId: number): Promise<Article[]> {
    const articles: any[] = await this.db.query({
      text:
        "SELECT id, title, authorId, timePublished, imageUrl FROM articles WHERE authorId = $1 ORDER BY timePublished DESC",
      args: [authorId],
    });
    return await this.withAuthorAndImage(articles);
  }
  async getRecentArticles(): Promise<Article[]> {
    return await this.getAllArticles();
  }
  async getArticleById(id: number): Promise<ArticleWithContent> {
    type inputType = {
      id: number;
      title: string;
      authorid: number;
      timepublished: string;
      imageurl: string;
      markdownurl: string;
    };
    const article: inputType = (await this.db.query({
      text: "SELECT * FROM articles WHERE id = $1",
      args: [id],
    }))[0];
    const comments: Comment[] = (await this.db.query({
      text:
        "SELECT id, title, content, sentBy, timeSent FROM comments WHERE articleId = $1",
      args: [id],
    })).map((comment: any) => ({
      id: comment.id,
      title: comment.title,
      content: comment.content,
      sentBy: comment.sentby,
      timeSent: comment.timesent,
    }));
    const author: Author = (await this.db.query({
      text: "SELECT * FROM authors WHERE id = $1",
      args: [article.authorid],
    }))[0];
    let markdown;
    try {
      markdown = await readFileStr(
        `./${article.markdownurl}`,
        { encoding: "utf8" },
      );
    } catch (err) {
      markdown = "";
    }
    return {
      id,
      title: article.title,
      timePublished: article.timepublished,
      imageUrl: `https://images.pexels.com/photos/${article.imageurl}`,
      comments,
      author,
      markdown,
    };
  }
  async comment(articleId: number, comment: Comment): Promise<void> {
    await this.db.query({
      text:
        "INSERT INTO comments (title, content, sentBy, timeSent, articleId) VALUES ($1, $2, $3, $4, $5)",
      args: [
        comment.title,
        comment.content,
        comment.sentBy,
        comment.timeSent,
        articleId,
      ],
    });
  }
}
