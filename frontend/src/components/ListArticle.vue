<template>
  <div class="list">
    <article class="list-article" @click.prevent="showingDetails">
      <header class="headerListArticle">
        <h2 class="titleArticle">{{article.titleArticle}}</h2>
        <DisplayHours v-bind:create-at="article.createAt"/>
      </header>
      <div class="content">
        <p class="content-article">{{article.content}}</p>
        <img class="content-img" v-if="article.imageUrl" v-bind:src="article.imageUrl" alt="">
      </div>
    </article>
    <div class="list-comment">
      <font-awesome-icon icon="comments" @click="showCommentary"></font-awesome-icon>
      <ListCommentary v-if="showComment" v-bind:articleId="article.id"/>
    </div>
  </div>
</template>

<script>
import ListCommentary from "@/components/ListCommentary";
import DisplayHours from "@/components/DisplayHours";
export default {
name: "ListArticle",
  components: {
    ListCommentary,
    DisplayHours
  },
  props: [
      "article"
  ],
  data() {
    return {
      showComment: false
    };
  },methods: {
    showingDetails() {
      this.$emit('showingDetail');
    },
    showCommentary() {
      this.showComment = !this.showComment;
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  background-color: white;
  margin: 1rem auto;
  padding: 0.5rem;
  cursor: pointer;
  width: 50%;
  box-shadow: 0 0 6px 1px darkgrey;

  &-article {
    .headerListArticle {
      display: flex;
      align-items: center;
      border-bottom: 1px solid darkgrey;
      .titleArticle {
        margin-right: 1rem;
        font-size: 1.5rem;
      }
    }
    .content {

      border-bottom: 1px solid darkgrey;
      padding: 0.5rem;
      &-img {
        width: 30%;
      }
    }
  }

  &-comment {
    padding: 1rem;
    text-align: left;
    svg {
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}

</style>
