<template>
  <article class="listArticle">
    <h2>{{article.titleArticle}}</h2>
    <p>{{article.createAt}}</p>
    <p>{{article.content}}</p>
    <img v-if="article.imageUrl" v-bind:src="article.imageUrl" alt="">
  </article>
</template>

<script>
export default {
name: "ListArticle",
  props: [
      "article"
  ]
}
</script>

<style scoped>
  article {
    cursor: pointer;
  }
</style>
