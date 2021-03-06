import {
  articleDao,
  Comment,
  Article,
  ArticleWithContent,
  Author,
} from "../types.ts";
import { Client } from "../deps.ts";
import "https://deno.land/x/dotenv/load.ts";

// helper database query class that parses the output into an array of object
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

  async query(query: { text: string; args: any[] } | string): Promise<any> {
    if (typeof query === 'object') {
      const result = await this.db.queryObject(query);
      return result.rows;
    }
    else {
      const result = await this.db.queryObject(query);
      return result.rows;
    }
  }
}

export class PostgresService implements articleDao {
  private db: DB;
  constructor() {
    this.db = new DB();
  }
  // create new instance and connect to database
  static async newInstance(): Promise<PostgresService> {
    const service = new PostgresService();
    await service.connect();
    return service;
  }
  async connect() {
    await this.db.connect();
    return this;
  }

  // add author data and image. O(number of articles * number of authors)
  // although not the best practice
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

    // map the articles to get the final output:
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
    // get article data
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
    // get comments
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
    // get author
    const author: Author = (await this.db.query({
      text: "SELECT * FROM authors WHERE id = $1",
      args: [article.authorid],
    }))[0];
    // get markdown
    let markdown;
    try {
      markdown = await Deno.readTextFile(
        `./${article.markdownurl}`
      );
    } catch (err) {
      markdown = "";
    }
    // return result
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
