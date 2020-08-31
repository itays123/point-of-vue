<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/router/Navbar.vue'

export default {
  components: {
    Navbar
  }
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
   background: #ededed;
}

#app {
  font-family: 'Roboto Slab', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

::-moz-placeholder {
  font-family: 'Roboto Slab', serif;
}

::-webkit-input-placeholder {
  font-family: 'Roboto Slab', serif;
}

:-ms-input-placeholder {
  font-family: 'Roboto Slab', serif;
}

::placeholder {
    font-family: 'Roboto Slab', serif;
}
</style>
