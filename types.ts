export type Comment = {
  id: number;
  content: string;
  title: string;
  timeSent: string;
  sentBy: string;
};

export type ArticleWithContent = {
  id: number;
  title: string;
  markdown: string;
  categories: number[];
  authorId: number;
  comments: Comment[];
  timePublished: string;
  imageUrl?: string;
};

export type Article = {
  id: number;
  title: string;
  timePublished: string;
  authorId: number;
  imageUrl?: string;
};

export interface articleDao {
  getAllArticles(): Promise<Article[]>;
  getArticlesByCategory(categoryId: number): Promise<Article[]>;
  getArticlesByAuthor(authorId: number): Promise<Article[]>;
  getRecentArticles(): Promise<Article[]>;
  getArticleById(id: number): Promise<ArticleWithContent>;
  comment(articleId: number, comment: Comment): Promise<void>;
}
