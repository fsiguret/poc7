<template>
  <article class="listArticle">
    <header class="headerListArticle">
      <h2 class="titleArticle">{{article.titleArticle}}</h2>
      <p class="createAt">{{article.createAt}}</p>
    </header>
    <div>
      <p class="content">{{article.content}}</p>
      <img class="imageArticle" v-if="article.imageUrl" v-bind:src="article.imageUrl" alt="">
    </div>
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

<style lang="scss" scoped>
  .listArticle {
    background-color: white;
    margin: 1rem auto;
    padding: 0.5rem;
    cursor: pointer;
    width: 50%;
    box-shadow: 0 0 6px 1px darkgrey;

    .headerListArticle {
      display: flex;
      align-items: center;
      .titleArticle {
        margin-right: 1rem;
        font-size: 1.5rem;
      }
      .createAt {
        font-size: 0.8rem;
      }
    }
  }
</style>
