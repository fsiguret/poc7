<template>
  <div class="commentary">
    <article class="commentary-article" v-if="!ifEditComment">
      <header>
        <ArticleOwner v-bind:id="com.userId"/>
        <DisplayHours v-bind:createAt="com.createAt"/>
      </header>
      <p class="commentary-content">{{com.com}}</p>
    </article>
    <EditCommentary v-if="(ifSameUserCom && ifEditComment) || (ifAdmin && ifEditComment)" v-bind:comId="com.id"/>
    <div>
      <button class="button commentary-button" v-if="ifSameUserCom || ifAdmin" @click.prevent="deleteCommentary(com.id)">Supprimer</button>
      <button class="button commentary-button" v-if="ifSameUserCom || ifAdmin" @click.prevent="showEditCommentary">Modifier</button>
    </div>
    <p v-if="message">{{message}}</p>
  </div>
</template>

<script>
import UserService from "@/services/user-service";
import DisplayHours from "@/components/DisplayHours";
import EditCommentary from "@/components/EditCommentary";
import ArticleOwner from "@/components/ArticleOwner";

export default {
  name: "Commentary",
  components: {
    ArticleOwner,
    EditCommentary,
    DisplayHours
  },
  props: [
    "com",
    "user"
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

    this.ifAdmin = this.user.rank === 4;

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

  @media screen and (max-width: 1540px) {
    margin: 1rem 0;
    width: 100%;
  }

  &-article {
    header {
      display: flex;
      align-items: center;
      padding-left: 0.5rem;
    }
  }

  div {
    width: 100%;

    @media screen and (max-width: 1000px){
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }

  &-content {
    text-align: left;
    margin-left: 4rem;
    padding: 2rem;

    @media screen and (max-width: 1540px) {
      margin-left: 1rem;
      padding: 1rem;
    }
  }

  &-button {
    width: 20%;
    margin: 1rem;

    @media screen and (max-width: 1540px) {
      width: 30%;
    }
    @media screen and (max-width: 400px){
      width: 50%;
    }
  }
}
</style>
