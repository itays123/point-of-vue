<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src
import API from '@/utils'

export default {
  name: 'Home',
  mounted () {
    API.request('/articles')
      .then(({ articles }) => console.log(articles))
  }
}
</script>
