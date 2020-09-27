<template>
  <div>
    <Commentary v-for="com in commentary" :key="com.id" v-bind:com="com" @onDelete="getAllComment(this.article.id)"/>
  </div>
</template>

<script>
import Commentary from "@/components/Commentary";
import UserService from "@/services/user-service";
import moment from "moment";
import Comment from "@/models/Commentary";

export default {
  name: "ListCommentary",
  components: {
    Commentary
  },
  props: [
    "articleId"
  ],
  data() {
    return {
      commentary: []
    }
  },
  created() {
    this.getAllComment(this.articleId)
  },
  methods: {
    getAllComment(id) {
      UserService.getComment(id)
          .then(response => {
            response.data.resultsSelect.forEach(comment => {

              comment.createAt = moment(String(comment.createAt)).fromNow();
              this.message = '';
              this.commentary.push(new Comment(comment.id, comment.userId, comment.articleId, comment.createAt, comment.com));
            });
          })
          .catch(error => {
            this.message = error.response.data;
          });
    }
  }
}
</script>

<style scoped>

</style>
