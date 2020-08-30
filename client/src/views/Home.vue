<template>
  <div class="home">
    <ArticleList :articles="articles" />
  </div>
</template>

<script>
// @ is an alias to /src
import API from '@/utils'
import ArticleList from '@/components/ArticleList'

export default {
  name: 'Home',
  data () {
    return {
      articles: []
    }
  },
  mounted () {
    API.request('/articles')
      .then(({ articles }) => {
        this.articles = articles
      })
  },
  components: {
    ArticleList
  }
}
</script>
