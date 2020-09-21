<template>
  <article>
    <div>
      <p>{{com.com}}</p>
      <p>{{com.createAt}}</p>
      <button v-if="ifSameUserCom" v-on:click="deleteCommentary(com.id)">Supprimer</button>
      <button v-if="ifSameUserCom">Modifier</button>
      <p v-if="message">{{message}}</p>
    </div>

  </article>
</template>

<script>
import UserService from "@/services/user-service";

export default {
  name: "Commentary",
  props: [
    "com"
  ],
  data() {
    return {
      message: '',
      ifSameUserCom: false
    };
  },
  created() {
    let user = JSON.parse(localStorage.getItem('user'));

    this.ifSameUserCom = user.userId === this.com.userId;
  },
  methods: {
    deleteCommentary(id) {

      let user = JSON.parse(localStorage.getItem('user'));

      UserService.deleteComment(id, user.userId)
          .then(response => {
            this.message = response.data;
            this.refreshCommentary();
          })
          .catch(error => {
            this.message = error.response.data;
          });
    },

    refreshCommentary() {
      this.$emit('onDelete');
    }
  }
}
</script>

<style scoped>

</style>
