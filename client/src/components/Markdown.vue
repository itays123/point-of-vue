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

<style scoped>
* {
    text-align: start;
}

.markdown {
    padding-top: 2rem;
    padding-left: 8px;
    padding-right: 8px;
}
</style>
