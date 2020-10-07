<template>
  <ul>
    <li><font-awesome-icon @click.prevent="like" icon="thumbs-up" class="button button-like" v-bind:class="[ifLiked ? 'button-like-active' : '']"/><span>{{displayValue(article.likes)}}</span></li>
    <li><font-awesome-icon @click.prevent="dislike" icon="thumbs-down" class="button button-dislike" v-bind:class="[ifDisliked ? 'button-dislike-active' : '']"/><span>{{displayValue(article.dislikes)}}</span></li>
    <li v-if="message !== null">{{message}}</li>
  </ul>
</template>

<script>
import UserService from "@/services/user-service";

export default {
  name: "LikeAndDislike",
  props: [
      "article",
      "isLike",
      "articlesLiked"
  ],
  data() {
      return {
        ifVoted: false,
        vote: {},
        message:'',
        ifLiked: false,
        ifDisliked: false
    };
  },
  mounted() {

    if(this.isLike === '') {
      this.articlesLiked.forEach(data => {
        if(this.article.id === data.articleId) {
          if(data.isLike === 1) {
            this.ifLiked = true;
            this.ifVoted = true;
          } else if( data.isLike === -1) {
            this.ifDisliked = true;
            this.ifVoted = true;
          }
        }
      });
    }

    if (this.isLike === 1) {
      this.ifLiked = true;
      this.ifVoted = true;
    } else if (this.isLike === -1) {
      this.ifDisliked = true;
      this.ifVoted = true;
    }
  },
  methods: {
    displayValue(value) {
      return value;
    },
    like() {

      let user = JSON.parse(localStorage.getItem('user'));
      this.message = '';

      if (!this.ifVoted) {

        this.ifVoted = true;
        this.ifLiked = true;

        this.vote = { userId: user.userId, like: "1" };

        UserService.putLikeOrDislike(this.article.id, this.vote)
            .then(() => {
              this.displayValue(this.article.likes++);
            })
            .catch(error => {
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            });

      } else if(this.ifVoted && this.ifLiked) {

        this.ifLiked= false;
        this.ifVoted = false;
        this.vote = { userId: user.userId, like: "0" };

        UserService.putLikeOrDislike(this.article.id, this.vote)
            .then(() => {
              this.displayValue(this.article.likes--);
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
      let user = JSON.parse(localStorage.getItem('user'));
      this.message = '';

      if (!this.ifVoted) {
        this.ifDisliked = true;
        this.ifVoted = true;
        this.vote = { userId: user.userId, like: "-1" };

        UserService.putLikeOrDislike(this.article.id, this.vote)
            .then(() => {
              this.displayValue(this.article.dislikes++);
            })
            .catch(error => {
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            });
      } else if(this.ifVoted && this.ifDisliked){
        this.ifDisliked = false;
        this.ifVoted = false;
        this.vote = { userId: user.userId, like: "0" };

        UserService.putLikeOrDislike(this.article.id, this.vote)
            .then(() => {
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
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1000px){
    padding: 0;
  }

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
