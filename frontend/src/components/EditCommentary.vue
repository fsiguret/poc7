<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(editCommentary)">
      <ValidationProvider name="contenu" rules="required" v-slot="{ errors }">
        <label for="content">Modifiez votre commentaire</label>
        <textarea v-model.lazy:value="commentary.com" name="content" id="content" placeholder="Laissez un commentaire à vos collègues !"></textarea>
        <div v-if="errors[0] !== undefined">
          <p>{{errors[0]}}</p>
        </div>
        <input class="button" type="submit" value="Modifier">
        <p>{{ message }}</p>
      </ValidationProvider>
    </form>
  </ValidationObserver>
</template>

<script>
import UserService from "@/services/user-service";
import Commentary from "@/models/Commentary";

export default {
name: "EditCommentary",
  props: [
      "comId"
  ],
  data() {
    return {
      message: '',
      commentary: '',
      user: JSON.parse(localStorage.getItem('user'))
    };
  },
  created() {
    UserService.getOneComment(this.comId)
        .then(response => {
          let comObject = response.data.results[0];
          this.commentary = new Commentary(comObject.id, this.user.userId, '','', comObject.com);
        })
        .catch(error => {
          this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        });
  },
  methods: {
    editCommentary() {
      UserService.putCommentary(this.comId, this.commentary)
          .then(response => {
            this.message = response.data;
            this.$router.push("/");
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
span {
  padding: 1rem;

  form {
    margin: auto;
    padding: 0;
    width: 90%;

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
}
</style>
