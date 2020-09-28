<template>
  <div class="commentary">
    <article class="commentary-article">
      <header>
        <DisplayHours v-bind:createAt="com.createAt"/>
      </header>
      <p class="commentary-content">{{com.com}}</p>
    </article>
    <button class="button commentary-button" v-if="ifSameUserCom" v-on:click="deleteCommentary(com.id)">Supprimer</button>
    <router-link class="button commentary-button" v-if="ifSameUserCom" :to="{ name: 'EditCom', params: {id: com.id}}">Modifier</router-link>
    <p v-if="message">{{message}}</p>
  </div>
</template>

<script>
import UserService from "@/services/user-service";
import DisplayHours from "@/components/DisplayHours";


export default {
  name: "Commentary",
  components: {
    DisplayHours
  },
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
            this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
          });
    },
    refreshCommentary() {
      this.$emit('onDelete');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/scss/button";

.commentary {
  background-color: white;
  box-shadow: 0 0 6px 1px darkgrey;
  border-radius: 0.1rem;
  margin: 1rem auto;
  width: 70%;
  text-align: center;

  &-article header {
    text-align: left;
    p {
      padding: 1rem;
      font-size: 0.8rem;
    }
  }

  &-content {
    text-align: left;
    margin-left: 4rem;

    padding: 2rem;
  }

  &-button {
    width: 20%;
    margin: 1rem;
  }
}
</style>
