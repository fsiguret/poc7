<template>

    <p v-if="message === null">Par {{user.firstName}} {{user.lastName}}</p>
    <p v-else>{{ message }}</p>

</template>

<script>
import AuthService from '@/services/auth-service';
import User from '@/models/User';

export default {
name: "ArticleOwner",
  props: [
      "id"
  ],
  data() {
    return {
      user: '',
      message: null
    };
  },
  created() {
    AuthService.getUser(this.id)
        .then(response => {
          this.message = null;
          const result = response.data.results;
          this.user = new User(this.id, result.firstName, result.lastName);
        })
        .catch(error => {
          this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        });
  }
}
</script>

<style lang="scss" scoped>
  p {
    padding-right: 1rem;
    font-size: 0.9rem;
  }
</style>
