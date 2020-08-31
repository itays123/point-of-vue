import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import Article from '../views/Article.vue'
import Author from '../views/Author.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category
  },
  {
    path: '/author/:id',
    name: 'Author',
    component: Author
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: Article
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
