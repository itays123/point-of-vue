import {
  articleDao,
  Article,
  ArticleWithContent,
  Comment,
  Author,
} from "../types.ts";

let testArticles = [
  {
    id: 1,
    title: "article1",
    timePublished: new Date(2020, 6, 8).toISOString(),
    markdown: "mama-mia, pizza pizza! \n## which is why....",
    author: 1,
    comments: [],
    categories: [1, 2, 3],
  },
  {
    id: 2,
    title: "article2",
    timePublished: new Date(2020, 7, 11).toISOString(),
    markdown: '<span style="background: lightblue">Marked content</span>',
    author: 1,
    comments: [],
    categories: [2, 3, 5, 7],
  },
  {
    id: 3,
    title: "article3",
    timePublished: new Date(2020, 3, 9).toISOString(),
    markdown: "a random article",
    author: 1,
    comments: [],
    categories: [8, 7, 6],
  },
  {
    id: 4,
    title: "article4",
    timePublished: new Date(2020, 0, 31).toISOString(),
    markdown: "Biden 2020!\n Trump 2020! ### COVID-19",
    author: 1,
    comments: [],
    categories: [1, 2, 3, 4],
  },
];

let authors: Map<number, Author> = new Map();
authors.set(1, {
  id: 1,
  name: "itay schechner",
});

export class TestService implements articleDao {
  private articles: ArticleWithContent[];
  private authors: Map<number, Author>;
  constructor() {
    this.articles = testArticles;
    this.authors = authors;
  }
  #withoutContent = (articles: ArticleWithContent[]): Article[] => {
    return articles.map(({ id, title, timePublished, author, imageUrl }) => ({
      id,
      title,
      timePublished,
      author: this.#withAuthorData(author),
      imageUrl,
    }));
  };
  #withAuthorData = (author: number | Author): Author => {
    if (typeof author === "number") {
      return this.authors.get(author)!;
    } else return author;
  };

  async getAllArticles(): Promise<Article[]> {
    const result = [...this.articles].sort((a, b) => {
      const aTime = new Date(a.timePublished).getTime();
      const bTime = new Date(b.timePublished).getTime();

      return bTime - aTime;
    });
    return this.#withoutContent(result);
  }
  async getArticlesByCategory(categoryId: number): Promise<Article[]> {
    const result = [...this.articles].filter(({ categories }) =>
      categories.includes(categoryId)
    );
    return this.#withoutContent(result);
  }
  async getArticlesByAuthor(authorId: number): Promise<Article[]> {
    const result = [...this.articles].filter((a) => a.author === authorId);
    return this.#withoutContent(result);
  }
  async getRecentArticles(): Promise<Article[]> {
    const result = [...this.articles].sort((a, b) => {
      const aTime = new Date(a.timePublished).getTime();
      const bTime = new Date(b.timePublished).getTime();

      return bTime - aTime;
    }).splice(0, 5);
    return this.#withoutContent(result);
  }
  async getArticleById(id: number): Promise<ArticleWithContent> {
    const result = this.articles.find((a) => a.id === id);
    if (!result) throw new Error("article not found");
    const author = this.#withAuthorData(result.author);
    return { ...result, author };
  }
  async comment(articleId: number, comment: Comment) {
    const index = this.articles.findIndex(({ id }) => articleId === id);
    this.articles[index].comments.push(comment);
  }
}
