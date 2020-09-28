<template>
  <section>
    <h1>Modifiez votre commentaire !</h1>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(editCommentary)">
        <ValidationProvider name="contenu" rules="required|alpha_spaces" v-slot="{ errors }">
          <label for="content">Commentaire</label>
          <textarea v-model.lazy:value="commentary.com" name="content" id="content" placeholder="Laissez un commentaire à vos collègues !"></textarea>
          <div v-if="errors[0] !== undefined">
            <p>{{errors[0]}}</p>
          </div>
          <input class="button" type="submit" value="Commenter">
          <p>{{ message }}</p>
        </ValidationProvider>
      </form>
    </ValidationObserver>
  </section>
</template>

<script>
import UserService from '@/services/user-service';
import Commentary from "@/models/Commentary";
export default {
name: "EditComment",
  data() {
    return {
      message: '',
      comId: parseInt(this.$route.params.id, 10),
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
</style>
