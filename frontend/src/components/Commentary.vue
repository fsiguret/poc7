<template>
  <div class="commentary">
    <article class="commentary-article" v-if="!ifEditComment">
      <header>
        <DisplayHours v-bind:createAt="com.createAt"/>
      </header>
      <p class="commentary-content">{{com.com}}</p>
    </article>
    <EditCommentary v-if="(ifSameUserCom && ifEditComment) || (ifAdmin && ifEditComment)" v-bind:comId="com.id"/>
    <button class="button commentary-button" v-if="ifSameUserCom || ifAdmin" @click.prevent="deleteCommentary(com.id)">Supprimer</button>
    <button class="button commentary-button" v-if="ifSameUserCom || ifAdmin" @click.prevent="showEditCommentary">Modifier</button>
    <p v-if="message">{{message}}</p>
  </div>
</template>

<script>
import UserService from "@/services/user-service";
import DisplayHours from "@/components/DisplayHours";
import EditCommentary from "@/components/EditCommentary";

export default {
  name: "Commentary",
  components: {
    EditCommentary,
    DisplayHours
  },
  props: [
    "com",
    "userRank"
  ],
  data() {
    return {
      message: '',
      ifSameUserCom: false,
      ifAdmin: false,
      ifEditComment: false
    };
  },
  created() {
    let user = JSON.parse(localStorage.getItem('user'));

    this.ifAdmin = this.userRank === 4;

    this.ifSameUserCom = user.userId === this.com.userId;
  },
  methods: {
    deleteCommentary(id) {

      let user = JSON.parse(localStorage.getItem('user'));

      UserService.deleteComment(id, user.userId)
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
    showEditCommentary() {
      this.ifEditComment = !this.ifEditComment;
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
