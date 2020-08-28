<template>
  <div class="home">
    <div class="article" v-html="markdown"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import marked from 'marked'

export default {
  name: 'Home',
  data () {
    return {
      markdown: marked('# Hello world!')
    }
  }
}
</script>
