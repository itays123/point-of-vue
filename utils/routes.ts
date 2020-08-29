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
  if (isNaN(categoryId)) {
    handler("invlid category id", 422, res);
    return;
  }
  const articles = await dao.getArticlesByCategory(categoryId);
  res.setContentType("application/json").send({ articles });
  // const { articles } = res.json();
});

api.get("/author/:id", async (req: Request, res: Response) => {
  const authorId = Number(req.params.id);
  if (isNaN(authorId)) {
    handler("invlid author id", 422, res);
    return;
  }
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
  if (isNaN(articleId)) {
    handler("invlid article id", 422, res);
    return;
  }
  try {
    const article = await dao.getArticleById(articleId);
    res.setContentType("application/json").send({ article });
    // const { article } = res.json();
  } catch (err) {
    handler(err.message, 404, res);
  }
});

api.post("/:articleId", async (req: Request, res: Response) => {
  const articleId = Number(req.params.articleId);
  if (isNaN(articleId)) {
    handler("invalid article id", 422, res);
  }
  type body = { title: string; content: string; sentBy: string };
  const comment: body = await req.body({ type: "json" }).value;
  await dao.comment(
    articleId,
    { ...comment, id: -1, timeSent: new Date().toISOString() },
  );
  res.status(201).send("201 ADDED");
});

// handle bad request params
const handler = (msg: string, status: number, res: Response) => {
  res.status(status).setContentType("application/json").send(
    { status: status, reason: msg },
  );
};

export default api;
