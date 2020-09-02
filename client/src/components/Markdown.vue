<template>
    <div class="markdown-container">
        <div class="markdown" v-html="content"></div>
    </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'Markdown',
  props: {
    markdown: String
  },
  computed: {
    content () {
      return marked(this.markdown)
    }
  }
}
</script>

<style>
.markdown * {
    text-align: start;
    margin-bottom: 0.5rem;
}

.markdown img {
  text-align: center;
  margin: 0 auto 0.5rem;
  width: 100%;
  max-height: 400px;
  object-fit: cover;
}

.markdown h1,
.markdown h2,
.markdown h3 {
  margin-top: 2rem;
}

.markdown {
    padding-top: 2rem;
    padding-left: 8px;
    padding-right: 8px;
}
</style>
