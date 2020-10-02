<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(newCommentary)">
      <ValidationProvider name="commentaire" rules="required" v-slot="{ errors }">
        <label for="content">Commentaire</label>
        <textarea v-model="commentary.com" name="content" id="content" placeholder="Laissez un commentaire à vos collègues !"></textarea>
        <div v-if="errors[0] !== undefined">
          <p>{{errors[0]}}</p>
        </div>
      </ValidationProvider>
      <input class="button" type="submit" value="Commenter">
      <p v-if="message">{{message}}</p>
    </form>
  </ValidationObserver>
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
    newCommentary() {
      let user = JSON.parse(localStorage.getItem('user'));

      this.commentary.userId = user.userId;
      this.commentary.articleId = this.articleId;

      UserService.postComment(this.articleId, this.commentary)
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/scss/button";
@import "src/scss/form";
form {
  width: 70%;
  textarea {
    width: 100%;
    border: solid darkgrey 2px;
    border-radius: 0.3rem;
    resize: vertical;
    margin: 1rem 0;
    &:focus {
      border-color: #a0a0f8;
    }
  }
}
</style>
