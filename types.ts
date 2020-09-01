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
  categories?: number[];
  author: number | Author;
  comments: Comment[];
  timePublished: string;
  imageUrl?: string;
};

export type Article = {
  id: number;
  title: string;
  timePublished: string;
  author: number | Author;
  imageUrl?: string;
};

export type Author = {
  id: number;
  name: string;
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
