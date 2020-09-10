<template>
  <div class="addArticle">
    <router-link to="/newArticle">+</router-link>
  </div>
</template>

<script>
export default {
name: "AddArticle"
}
</script>

<style lang="scss" scoped>
  .addArticle {
    position: sticky;
    top: 1em;
    width: 2em;
    height: 2em;
    background-color: #42b983;
    border-radius: 50%;
    a {
      text-decoration: none;
      text-align: center;
      color: white;
      margin: auto;
      font-size: 1.6em;
    }
  }
</style>
