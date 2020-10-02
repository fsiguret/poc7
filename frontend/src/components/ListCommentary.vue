<template>
  <div>
    <Commentary v-for="com in commentary" :key="com.id" v-bind:com="com" v-bind:userRank="userRank"/>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import Commentary from "@/components/Commentary";
import UserService from "@/services/user-service";
import Comment from "@/models/Commentary";
import AuthService from "@/services/auth-service";

export default {
  name: "ListCommentary",
  components: {
    Commentary
  },
  props: [
    "articleId"
  ],
  data() {
    return {
      commentary: [],
      message: '',
      userRank: ''
    }
  },
  created() {
    let user = JSON.parse(localStorage.getItem('user'));

    AuthService.getUser(user.userId)
        .then(response => {
          this.userRank = response.data.results[0].rank;
        })
        .catch(error => {
          this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        });
    this.getAllComment(this.articleId);
  },
  methods: {
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

<style scoped>

</style>
