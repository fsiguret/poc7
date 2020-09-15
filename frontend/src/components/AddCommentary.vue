<template>
  <form @submit.prevent="newCommentary(articleId)">
    <label for="content">Commentaire</label>
    <input type="text" v-model="commentary.com" v-validate="'required'" name="content" id="content" placeholder="Votre commentaire...">
    <input type="submit" value="Commenter">
    <div v-if="errors.has('content')">
      <p>Un contenu est obligatoire !</p>
    </div>
    <p v-if="message">{{message}}</p>
  </form>
</template>

<script>
import UserService from "@/services/user-service";
import Commentary from "@/models/Commentary";

export default {
name: "AddCommentary",
  props: [
    'articleId'
  ],
  data() {
    return {
      commentary: new Commentary('','','','',''),
      message: ''
    };
  },
  methods: {
    newCommentary(id) {
      let user = JSON.parse(localStorage.getItem('user'));

      this.commentary.userId = user.userId;
      this.commentary.articleId = id;

      UserService.postComment(id, this.commentary)
          .then(response => {
            this.message = response.data;
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
