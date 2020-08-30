<template>
  <div class="category">
    <ArticleList :articles="articles" />
  </div>
</template>

<script>
// @ is an alias to /src
import API from '@/utils'
import ArticleList from '@/components/ArticleList'

export default {
  name: 'Category',
  data () {
    return {
      articles: []
    }
  },
  mounted () {
    this.refresh()
  },
  watch: {
    $route (to, from) {
      this.refresh()
    }
  },
  methods: {
    refresh () {
      API.request(`/articles${this.$route.fullPath}`)
        .then(({ articles }) => {
          this.articles = articles
        })
    }
  },
  components: {
    ArticleList
  }
}
</script>
