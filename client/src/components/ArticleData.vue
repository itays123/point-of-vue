<template>
    <div class="article article-data">
        <router-link :to="`/article/${article.id}`">
            <img :src="article.imageUrl || 'https://dummyimage.com/600x400/aaaaaa/ffffff.png&text=article+image'" alt="img" />
            <div class="content">
                <h3 class="article-title">{{ article.title }}</h3>
                <p class="article-author-date">
                    <span>{{ article.author.name }}</span>
                    <span> &#8226; </span>
                    <span>{{ date }}</span>
                </p>
            </div>
        </router-link>
    </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ArticleData',
  props: {
    article: Object
  },
  computed: {
    date () {
      const date = new Date(this.article.timePublished)
      return moment(date).fromNow()
    }
  }
}
</script>

<style scoped>
* {
    text-decoration: none;
    color: inherit;
}

.article-data {
    background: #fff;
    overflow: hidden;
    border-radius: 24px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1),
                -5px -5px 10px rgba(255, 255, 255, 1);
}

.article-data img {
    width: 100%;
}

.article-data .content {
    padding: 16px;
}

.article-data .content h3,
.article-author-date span:first-child {
    text-transform: capitalize;
}

.article-author-date {
    color: #555;
}
</style>
