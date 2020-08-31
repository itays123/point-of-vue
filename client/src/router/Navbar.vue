<template>
  <div id="nav">
    <div class="brand">
      <router-link to="/">
        <img alt="logo" src="../assets/logo.png" width="24" height="24" />
        <h1>Point Of Vue</h1>
      </router-link>
    </div>
    <div class="categories" v-if="!$route.fullPath.includes('/article')">
      <router-link to="/category/1">Israel News</router-link> |
      <router-link to="/category/2">World</router-link> |
      <router-link to="/category/3">COVID-19</router-link> |
      <router-link to="/category/4">Middle East</router-link> |
      <router-link to="/category/5">Tech & Space</router-link> |
      <router-link to="/category/6">Economy</router-link> |
      <router-link to="/category/7">Environment</router-link> |
      <router-link to="/category/8">Travel</router-link>
    </div>
  </div>
</template>
ּּ
<style scoped>
#nav {
  background: #00838f;
  color: #fff;
}

#nav a {
    text-decoration: none;
    color: inherit;
}

.brand a {
  display: flex;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
}

.brand h1 {
  margin-left: 8px;
  font-family: "Lobster";
}

.categories {
    padding-bottom: 8px;
}
</style>
