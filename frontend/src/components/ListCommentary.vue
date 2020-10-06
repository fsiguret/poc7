<template>
  <div>
    <Commentary v-for="com in commentary" :key="com.id" v-bind:com="com" v-bind:user="user"/>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import Commentary from "@/components/Commentary";
import UserService from "@/services/user-service";
import Comment from "@/models/Commentary";
import AuthService from "@/services/auth-service";
import User from "@/models/User";

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
      user: ''
    }
  },
  created() {
    let user = JSON.parse(localStorage.getItem('user'));

    AuthService.getUser(user.userId)
        .then(response => {
          const result = response.data.results[0];
          this.user = new User(result.userId, result.firstName, result.lastName, '', '', result.rank);
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
