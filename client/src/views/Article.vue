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
              <p v-if="article.author">{{ article.author.name }}</p>
              <p>{{ date }}</p>
          </div>
      </div>
      <Markdown :markdown="article.markdown" />
    </div>
    <div class="comments"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import API from '@/utils'
import Markdown from '../components/Markdown.vue'
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
    }
  },
  components: {
    Markdown
  },
  watch: {
    article () {
      console.log(this.article)
    }
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
.article .text {
    width: 50%;
    margin: 0 auto;
}

.article .text {
    padding-bottom: 5rem;
}

@media (max-width: 960px) {
    .article .headings,
    .article .text {
        width: 70%;
    }
}

@media (max-width: 760px) {
    .article .headings,
    .article .text {
        width: 80%;
    }
}

@media (max-width: 520px) {
    .article .headings,
    .article .text {
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

.author-date .data p:first-child {
    text-transform: capitalize;
}

</style>
