import { Router, Request, Response } from "../deps.ts";
import { articleDao } from "../types.ts";
import { TestService } from "./TestService.ts";

const api = new Router();
let dao: articleDao;
dao = new TestService();

api.get("/", async (req: Request, res: Response) => {
  const articles = await dao.getAllArticles();
  res.setContentType("application/json").send({ articles });
  // const { articles } = res.json();
});

api.get("/category/:id", async (req: Request, res: Response) => {
  const categoryId = Number(req.params.id);
  if (isNaN(categoryId)) throw new Error("bad request param");
  const articles = await dao.getArticlesByCategory(categoryId);
  res.setContentType("application/json").send({ articles });
  // const { articles } = res.json();
});

api.get("/author/:id", async (req: Request, res: Response) => {
  const authorId = Number(req.params.id);
  if (isNaN(authorId)) throw new Error("bad request param");
  const articles = await dao.getArticlesByAuthor(authorId);
  res.setContentType("application/json").send({ articles });
  // const { articles } = res.json();
});

api.get("/recent", async (req: Request, res: Response) => {
  const articles = await dao.getRecentArticles();
  res.setContentType("application/json").send({ articles });
  // const { articles } = res.json();
});

api.get("/:articleId", async (req: Request, res: Response) => {
  const articleId = Number(req.params.articleId);
  if (isNaN(articleId)) throw new Error("bad request param");
  const article = await dao.getArticleById(articleId);
  res.setContentType("application/json").send({ article });
  // const { article } = res.json();
});

api.post("/:articleId", async (req: Request, res: Response) => {
  const articleId = Number(req.params.articleId);
  if (isNaN(articleId)) throw new Error("bad request param");
  type body = { title: string; content: string; sentBy: string };
  const comment: body = await req.body({ type: "json" }).value;
  await dao.comment(
    articleId,
    { ...comment, id: -1, timeSent: new Date().toISOString() },
  );
  res.status(201).send("201 ADDED");
});

api.error((err: Error, req: Request, res: Response) => {
  res.status(422).setContentType("application/json").send(
    { status: 422, reason: err.message },
  );
});

export default api;
