<template>
  <div class="list">
    <article class="list-article" @click.prevent="showingDetails">
      <header class="headerListArticle">
        <h2 class="titleArticle">{{article.titleArticle}}</h2>
        <ArticleOwner v-bind:id="article.userId"/>
        <DisplayHours v-bind:createAt="article.createAt"/>
      </header>
      <div class="content">
        <p class="content-article">{{article.content}}</p>
        <img class="content-img" v-if="article.imageUrl" v-bind:src="article.imageUrl" alt="">
      </div>

    </article>
    <div class="list-comment">
      <div class="list-comment-addon">
        <font-awesome-icon icon="comments" @click="showCommentary"></font-awesome-icon>
        <LikeAndDislike v-bind:article="article" v-bind:isLike="isLike" v-bind:articlesLiked="articlesLiked"/>
      </div>
      <ListCommentary v-if="showComment" v-bind:articleId="article.id"/>
    </div>
  </div>
</template>

<script>
import ListCommentary from "@/components/ListCommentary";
import DisplayHours from "@/components/DisplayHours";
import LikeAndDislike from "@/components/LikeAndDislike";
import ArticleOwner from "@/components/ArticleOwner";

export default {
name: "ListArticle",
  components: {
    ArticleOwner,
    LikeAndDislike,
    ListCommentary,
    DisplayHours
  },
  props: [
      "article",
      "isLike",
      "articlesLiked"
  ],
  data() {
    return {
      showComment: false,
      articleLike:''
    };
  },
  methods: {
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

  @media screen and (max-width: 660px){
    width: 80%;
  }

  &-article {

    .headerListArticle {
      display: flex;
      align-items: center;
      border-bottom: 1px solid darkgrey;

      .titleArticle {
        margin-right: 1rem;
        font-size: 1.5rem;
        overflow-wrap: break-word;
        max-width: 80%;
      }
    }

    .content {
      border-bottom: 1px solid darkgrey;
      padding: 0.5rem;

      &-img {
        width: 30%;
      }

      ul {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  &-comment {
    padding: 1rem;
    text-align: left;

    &-addon {
      display: flex;
      justify-content: space-between;
      align-items: center;
      svg {
        cursor: pointer;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
