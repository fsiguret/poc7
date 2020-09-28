<template>
  <ul>
    <li><font-awesome-icon @click.prevent="like" icon="thumbs-up" class="button button-like"/><span>{{displayValue(article.likes)}}</span></li>
    <li><font-awesome-icon @click.prevent="dislike" icon="thumbs-down" class="button button-dislike"/><span>{{displayValue(article.dislikes)}}</span></li>
    <li v-if="message !== null">{{message}}</li>
  </ul>
</template>

<script>
import UserService from "@/services/user-service";

export default {
name: "LikeAndDislike",
  props: [
      "article"
  ],
  data() {
   return {
     ifVoted: false,
     vote: {},
     message:''
   };
  },
  methods: {
    displayValue(value) {
      return value;
    },
    like() {
      const likeBtn = document.getElementsByClassName("button-like");
      let likeBtnClasses = likeBtn[0].classList;
      let user = JSON.parse(localStorage.getItem('user'));

      if (!this.ifVoted) {
        likeBtnClasses.toggle("button-like-active");
        this.ifVoted = true;
        this.vote = { userId: user.userId, like: "1" };

        UserService.putLikeOrDislike(this.article.id, this.vote)
            .then(response => {
              this.message = response.data;
              this.displayValue(this.article.likes++);
            })
            .catch(error => {
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            });

      } else if(likeBtnClasses.contains("button-like-active")) {
        likeBtnClasses.remove("button-like-active");
        this.ifVoted = false;
        this.vote = { userId: user.userId, like: "0" };

        UserService.putLikeOrDislike(this.article.id, this.vote)
            .then(response => {
              this.displayValue(this.article.likes--);
              this.message = response.data;
            })
            .catch(error => {
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            });
      }
    },
    dislike() {
      const dislikeBtn = document.getElementsByClassName("button-dislike");
      let dislikeBtnClasses = dislikeBtn[0].classList;
      let user = JSON.parse(localStorage.getItem('user'));

      if (!this.ifVoted) {
        dislikeBtnClasses.toggle("button-dislike-active");
        this.ifVoted = true;
        this.vote = { userId: user.userId, like: "-1" };

        UserService.putLikeOrDislike(this.article.id, this.vote)
            .then(response => {
              this.message = response.data;
              this.displayValue(this.article.dislikes++);
            })
            .catch(error => {
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            });
      } else if(dislikeBtnClasses.contains("button-dislike-active")){
        dislikeBtnClasses.remove("button-dislike-active");
        this.ifVoted = false;
        this.vote = { userId: user.userId, like: "0" };

        UserService.putLikeOrDislike(this.article.id, this.vote)
            .then(response => {
              this.message = response.data;
              this.displayValue(this.article.dislikes--);
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
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  li {
    margin: 0.5rem;
    .button {
      margin-right: 1rem;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }
      &-like {
        &-active {
          color: blue;
        }

      }
      &-dislike {
        &-active {
          color: red;
        }
      }
    }
  }
}
</style>
