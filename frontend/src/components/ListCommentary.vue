<template>
  <div>
    <Commentary v-for="com in commentary" :key="com.id" v-bind:com="com" />
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import Commentary from "@/components/Commentary";
import UserService from "@/services/user-service";
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
      commentary: [],
      message:''
    }
  },
  created() {
    this.getAllComment(this.articleId);
  },
  methods: {
    getAllComment(id) {
      UserService.getComment(id)
          .then(response => {
            response.data.resultsSelect.forEach(comment => {
              this.message = '';
              this.commentary.push(new Comment(comment.id, comment.userId, comment.articleId, comment.createAt, comment.com));
            });
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

<style scoped>

</style>
