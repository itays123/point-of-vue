This is a short article to share some really useful tip I implement in TypeScript that will change your entire perspective. <br />
As a former Java developer I used it all the time and I highly recommand you to check it out. <br />
This will allow you to switch your database with just ONE line of code!

## How it works

In Java, just like TypeScript, you have interfaces. <br />
Those interfaces can contain methods, so create an interface with all the database methods you want:

```ts
export interface articleDao {
  getAllArticles(): Promise<Article[]>;
  getArticlesByCategory(categoryId: number): Promise<Article[]>;
  getArticlesByAuthor(authorId: number): Promise<Article[]>;
  getRecentArticles(): Promise<Article[]>;
  getArticleById(id: number): Promise<ArticleWithContent>;
  comment(articleId: number, comment: Comment): Promise<void>;
}
```

then implement this method on any database class you want, and use it in your middleware functions like this:

```ts
const api = new Router();
let dao: articleDao;
// both will work!
dao = new TestService();
dao = await PostgresService.newInstance();

api.get("/", async (req: Request, res: Response) => {
  const articles = await dao.getAllArticles();
  res.setContentType("application/json").send({ articles });
});
```
<br />
Get full source code at my repository.