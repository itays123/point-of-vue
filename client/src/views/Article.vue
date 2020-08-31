<template>
  <div class="article">
    <div class="headings">
      <h1>{{ article.title }}</h1>
      <h4>{{ article.subheading || 'a meaningless subheading, that filles the gap between the article\'s title and main picture' }}</h4>
    </div>
    <img :src="mainImage" />
    <div class="text">
      <div class="author-date">
          <div class="image" :style="authorStyle"></div>
          <div class="data">
              <p v-if="article.author">
                <router-link :to="`/author/${article.author.id}`">
                  {{ article.author.name }}
                </router-link>
              </p>
              <p>{{ date }}</p>
          </div>
      </div>
      <Markdown :markdown="article.markdown" />
    </div>
    <div class="comments" v-if="article.comments">
      <div class="comment-container">
        <h1>Comments</h1>
      </div>
      <div class="comment-container" v-for="comment of article.comments" :key="comment.id">
        <Comment :comment="comment" />
      </div>
      <div class="comment-container add">
        <h2>Add your own comment</h2>
        <AddComment :articleId="$route.params.id" :handleAdd="handleAdd" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import API from '@/utils'
import Markdown from '../components/Markdown.vue'
import Comment from '../components/Comment.vue'
import AddComment from '../components/AddComment.vue'
import moment from 'moment'

export default {
  name: 'Article',
  data () {
    return {
      article: {
        markdown: ''
      }
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    refresh () {
      API.request(`/articles/${this.$route.params.id}`)
        .then(({ article }) => {
          this.article = article
        })
    },
    handleAdd (comment) {
      if (this.article.comments) {
        this.article.comments.push(comment)
      }
    }
  },
  components: {
    Markdown,
    Comment,
    AddComment
  },
  computed: {
    date () {
      if (!this.article.timePublished) return ''
      else {
        const datePublished = new Date(this.article.timePublished)
        const fromNow = moment(datePublished).fromNow()
        return fromNow
      }
    },
    mainImage () {
      if (!this.article.imageUrl) {
        return 'https://dummyimage.com/900x600/aaaaaa/ffffff.png&text=article+image'
      } else return this.article.imageUrl
    },
    authorStyle () {
      let image = 'https://dummyimage.com/100x100/aaaaaa/ffffff.png'
      if (this.article.author?.imageUrl) image = this.article.author.imageUrl
      return `background-image: url(${image})`
    }
  }
}
</script>

<style scoped>
.article {
    background: white;
}

.article .headings,
.article .text,
.article .comment-container {
    width: 50%;
    margin: 0 auto;
}

@media (max-width: 960px) {
    .article .headings,
    .article .text,
    .article .comment-container {
        width: 70%;
    }
}

@media (max-width: 760px) {
    .article .headings,
    .article .text,
    .article .comment-container {
        width: 80%;
    }
}

@media (max-width: 520px) {
    .article .headings,
    .article .text,
    .article .comment-container {
        width: 90%;
    }
}

.article * {
    text-align: start;
}

.article h1 {
    text-transform: capitalize;
}

.article .headings h1,
.article .headings h4 {
    font-family: 'Comfortaa', cursive;
    margin: 0.5rem 0 1rem;
}

.headings h4 {
    color: #444;
}

.article .headings {
    padding-top: 3rem;
}

.article img {
    width: 100%;
    max-width: 945px;
}

.author-date {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
}

.author-date .image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ddd;
    background-size: cover;
}

.author-date .data {
    margin-left: 0.5rem;
}

.author-date .data p:first-child a {
    text-transform: capitalize;
    text-decoration: none;
    color: inherit;
}

.article .text {
  padding-bottom: 2rem;
}

.article .comments {
  background: #ddd;
  padding: 3rem 0;
}

.add.comment-container {
  margin-top: 2rem;
}

</style>
