import { App, Request, Response, staticServe } from "./deps.ts";

const app = new App();

app.use(staticServe("client/dist"));

app.use(async (req: Request, res: Response) => {
  await res.sendFile("client/dist/index.html");
});

app.listen({ port: 3000 });
