<template>
  <div class="addArticle">
    <router-link to="/newArticle"><font-awesome-icon icon="plus"/></router-link>
  </div>
</template>

<script>
export default {
name: "AddArticle"
}
</script>

<style lang="scss" scoped>
  .addArticle {
    position: fixed;
    bottom: 2rem;
    right: 2rem;

    width: 2em;
    height: 2em;
    background-color: #42b983;
    border-radius: 50%;
    svg {
      height: 100%;
      color: white;
    }
  }

</style>
