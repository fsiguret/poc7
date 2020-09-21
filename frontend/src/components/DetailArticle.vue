<template>
  <div>
    <button @click="homePage()">Fermer</button>
    <button v-if="ifSameUserArticle" @click="deleteArticle(article.id)" type="button">Supprimer</button>
    <button v-if="ifSameUserArticle" type="button">Modifier</button>
    <article>
      <h2>{{article.titleArticle}}</h2>
      <div>
        <p>{{article.content}}</p>
        <img v-if="article.imageUrl" v-bind:src="article.imageUrl" alt="">
      </div>
      <div>
        <p>{{article.createAt}}</p>
        <ul>
          <li>{{article.likes}}</li>
          <li>{{article.dislikes}}</li>
        </ul>
      </div>
    </article>
    <Commentary v-for="com in commentary" :key="com.id" v-bind:com="com" @onDelete="getAllComment(this.article.id)"/>
    <AddCommentary v-bind:articleId="article.id"/>
  </div>
</template>

<script>

import UserService from "@/services/user-service";
import moment from "moment";
import Comment from "@/models/Commentary";
import Commentary from "@/components/Commentary";
import AddCommentary from "@/components/AddCommentary";

export default {
name: "Article",
  props: [
      "article"
  ],
  components: {
    Commentary,
    AddCommentary
  },
  data() {
    return {
      ifSameUserArticle: false,
      commentary: []
    };
  },
  created() {
    let user = JSON.parse(localStorage.getItem('user'));

    this.ifSameUserArticle = user.userId === this.article.userId;

    this.getAllComment(this.article.id);
  },
  methods: {
    homePage() {
      this.$emit('closeDetail');
    },

    deleteArticle(id) {
      let user = JSON.parse(localStorage.getItem('user'));

      UserService.deleteArticle(id, user.userId)
          .then(response => {
            this.message = response.data;
            this.$router.push('/');
          })
          .catch(error => {
            this.message = error.response.data;
          });
    },
    getAllComment(id) {
      UserService.getComment(id)
          .then(response => {
            response.data.resultsSelect.forEach(comment => {

              comment.createAt = moment(String(comment.createAt)).fromNow();
              this.message = '';
              this.commentary.push(new Comment(comment.id, comment.userId, comment.articleId, comment.createAt, comment.com));
            });
          })
          .catch(error => {
            this.message = error.response.data;
          });
    }
  }
}
</script>

<style scoped>

</style>
