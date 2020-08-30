<template>
    <div class="list-container">
        <div class="margin"></div>
        <div class="article-list">
            <div v-for="article in articles" :key="article.id">
                <ArticleData :article="article" />
            </div>
        </div>
        <div class="margin"></div>
    </div>
</template>

<script>
import ArticleData from './ArticleData'

export default {
  name: 'ArticleList',
  props: {
    articles: Array
  },
  components: {
    ArticleData
  }
}
</script>

<style scoped>
.list-container {
    display: grid;
    grid-template-columns: auto minmax(300px, 70%) auto;
    justify-items: center;
}

.article-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(254px, 1fr));
    grid-gap: 24px;
    margin-top: 24px;
    margin-bottom: 24px;
}
</style>
