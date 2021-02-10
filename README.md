# Point Of Vue

a newspaper website, built with the power of Deno and Vue.js

**Note: As of February 2021, boostraping this project will not work due to Deno updates. Will fix soon.**

## Routes and pages

### Frontend

- `/` - the home page, featuring the last articles
- `/category/:id` - presenting articles of specific categories
- `/author/:id` - presenting articles of specific author
- `/article/:id` - the article page

### Backend

- `/api/articles`
    - GET `/`, `/recent` - get the latest articles
    - GET `/category/:id` - get recent articles from a specific category
    - GET `/author/:id` - get recent articles from a specific author
    - GET `/article/:id` - get full article data, including comments and markdown
    - POST `/article/:id` - comment on an article. comment body required.

## Project structure

- types.ts
- deps.ts
- server.ts
- database.sql - a record of all postgres comments I executed.
- client
    - dist - bundled files
    - public - public files for webpack to build
    - src - source frontend code
    - package.json
    - other config files
- utils
    - routes.ts - responsible for using either services and send them to the client
    - PostgresService.ts - responsible for implementing the service with PostgreSQL
    - TestService.ts - responsible for implementing the service with an in-memody db
- scripts
    - add-article.ts - responsible for adding articles to the database
- articles
    - article markdown files
- img
    - public images

### client/src

- App.vue
- utils.js (for making requests to backend)
- main.js
- assets - for images that are directly used on frontend
- components - for reusable components
    - AddComment.vue
    - ArticleData.vue
    - ArticleList.vue
    - Comment.vue
    - Markdown.vue (parses the markdown)
- router (vue router related files)
    - index.js - for managing routes
    - Navbar.vue - the navigation bar component
- views (for route files)
    - Article.vue
    - Author.vue
    - Category.vue
    - Home.vue

## Scripts and Methods

### initializing the project

1. in the client folder, install all dependencies and build the project
2. run postgres and execute all commands in `database.sql`
3. add articles
4. run the project with `deno run -A --unstable server.ts`

### Adding an Article

1. create the markdown file in the articles folder
2. run `deno run -A --unstable scripts/add-article.ts` and answer the questions **Note:** on the main image url, it automatically adds `https://images.pexels.com/photos` to the image url.