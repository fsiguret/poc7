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
@import "src/scss/variables";
  .addArticle {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
    width: 2em;
    height: 2em;
    background-color: $elementColor;
    border-radius: 50%;

    @media screen and (max-width: 660px){
      bottom: 1rem;
      right: 1rem;
    }

    &:hover {
      background-color: $elementColorHover;
    }

    svg {
      height: 100%;
      color: white;
    }
  }
</style>
