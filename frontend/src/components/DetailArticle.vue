<template>
  <div class="detailArticle">
    <button class="button detailArticle-button" @click="homePage()">Fermer</button>

    <article class="detailArticle--article">
      <h2>{{article.titleArticle}}</h2>
      <div class="detailArticle--article-flex">
        <div class="detailArticle--content">
          <p>{{article.content}}</p>
          <img class="detailArticle--article-flex-img" v-if="article.imageUrl" v-bind:src="article.imageUrl" alt="">
        </div>
        <div>
          <DisplayHours v-bind:createAt="article.createAt"/>
          <LikeAndDislike v-bind:article="article" v-bind:isLike="isLike"/>
        </div>
      </div>
      <div>
        <button class="button detailArticle--article-button" v-if="ifSameUserArticle || ifAdmin" @click="deleteArticle(article.id)" type="button">Supprimer</button>
        <router-link class="button detailArticle--article-button" v-if="ifSameUserArticle || ifAdmin" type="button" :to="{ name: 'EditArticle', params: { id: article.id}}">Modifier</router-link>
      </div>
    </article>
    <h2>Commentaires</h2>
    <div v-if="commentary.length === 0">
      <p>Il n'y a pas de commentaires pour le moment !</p>
    </div>
    <Commentary v-else v-for="com in commentary" :key="com.id" v-bind:com="com" v-bind:userRank="userRank" @onDelete="getAllComment(this.article.id)"/>
    <h2>Participez vous aussi !</h2>
    <AddCommentary v-bind:articleId="article.id"/>
  </div>
</template>

<script>
import UserService from "@/services/user-service";
import AuthService from "@/services/auth-service";
import Comment from "@/models/Commentary";
import Commentary from "@/components/Commentary";
import AddCommentary from "@/components/AddCommentary";
import LikeAndDislike from "@/components/LikeAndDislike";
import DisplayHours from "@/components/DisplayHours";

export default {
name: "Article",
  props: [
      "article",
      "isLike"
  ],
  components: {
    DisplayHours,
    Commentary,
    AddCommentary,
    LikeAndDislike
  },
  data() {
    return {
      ifSameUserArticle: false,
      ifAdmin:false,
      commentary: [],
      userRank:''
    };
  },
  created() {
    let user = JSON.parse(localStorage.getItem('user'));

    AuthService.getUser(user.userId)
        .then(response => {

          this.userRank = response.data.results.rank;
          this.ifAdmin = this.userRank === 4;
        })
        .catch(error => {
          this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        });

    this.ifSameUserArticle = user.userId === this.article.userId;

    this.getAllComment(this.article.id);
  },
  methods: {
    homePage() {
      this.$router.push('/');
    },

    deleteArticle(id) {
      let user = JSON.parse(localStorage.getItem('user'));

      UserService.deleteArticle(id, user.userId)
          .then(response => {
            this.message = response.data;
            this.$router.push('/');
          })
          .catch(error => {
            this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
          });
    },
    getAllComment(id) {
      UserService.getComment(id)
          .then(response => {
            response.data.resultsSelect.forEach(comment => {
              this.message = '';
              this.commentary.push(new Comment(comment.id, comment.userId, comment.articleId, comment.createAt, comment.com));
            });
          })
          .catch(error => {
            this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
          });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/scss/button";
.detailArticle {
  width: 50%;
  margin: auto;

  @media screen and (max-width: 1040px){
    width: 80%;
  }
  &-button {
    width: 20%;

    @media screen and (max-width: 400px) {
      width: 30%;
    }
  }

  &--article {
    background-color: white;
    box-shadow: 0 0 6px 1px darkgrey;
    border-radius: 0.1rem;
    margin: 1rem auto;

    div {
      @media screen and (max-width: 1000px){
        display: flex;
        align-items: center;
        flex-direction: column;
      }
    }

    &-button {
      width: 20%;
      margin: 1rem;
      @media screen and (max-width: 620px) {
        width: 50%;
      }
    }

    &-flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;

      div {
        width: 70%;
      }

      &-img {
        margin: auto;
        width: 50%;

      }
    }
  }
}
</style>
