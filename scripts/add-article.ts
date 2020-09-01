import { Client } from "../deps.ts";
import "https://deno.land/x/dotenv/load.ts";

const database = new Client({
  user: "postgres",
  database: "pov",
  hostname: "localhost",
  password: Deno.env.get("PASSWORD")!,
  port: 5432,
});

await database.connect();

async function ask(
  question: string = "",
  stdin = Deno.stdin,
  stdout = Deno.stdout,
) {
  const buf = new Uint8Array(1024);

  // Write question to console
  await stdout.write(new TextEncoder().encode(question));

  // Read console's input into answer
  const n = <number> await stdin.read(buf);
  const answer = new TextDecoder().decode(buf.subarray(0, n));

  return answer.trim();
}

async function askAndValidate(
  question: string,
  type: "string" | "number" = "string",
  validate: Function = (answer: string) => answer.trim() !== "",
) {
  let answer: any = "";
  do {
    answer = await ask(question);
    if (type === "number") answer = Number(answer);
  } while (!validate(answer));
  return answer;
}

const title = await askAndValidate("article title: ");
const authorId = await askAndValidate(
  "author id: ",
  "number",
  (answer: number) => !isNaN(answer),
);
const markdownUrl = "articles/" + await askAndValidate("markdown file: ");
Deno.stdout.writeSync(new TextEncoder().encode(`
(1) Israel
(2) World
(3) COVID-19
(4) Middle East
(5) Tech
(6) Economy
(7) Enviroment
(8) Travel
`));
const categories = await askAndValidate(
  "categories (seperated by space): ",
  "string",
);

const timePublished = new Date().toISOString();
const imageUrl = await askAndValidate("main image url: ");

console.log({
  title,
  authorId,
  markdownUrl,
  categories,
  timePublished,
  imageUrl,
});

const confirmed = /^y|yes|ok|true/i.test(
  await ask("are you ready to proceed? (Y/n)"),
);

if (!confirmed) {
  Deno.exit();
}

await database.query({
  text:
    "INSERT INTO articles (title, markdownUrl, categories, authorId, timePublished, imageUrl) VALUES ($1, $2, $3, $4, $5, $6);",
  args: [title, markdownUrl, categories, authorId, timePublished, imageUrl],
});
