<template>
  <div class="login">
    <h1>Connexion</h1>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(handleLogin)">
        <ValidationProvider name="E-mail" rules="required|email" v-slot="{ errors }">
            <label for="email">E-mail</label>
            <input type="email" v-model="user.email" name="email" id="email">
            <div v-if="errors[0] !== undefined">
              <p>{{errors[0]}}</p>
            </div>
        </ValidationProvider>
        <ValidationProvider name="Mot de passe" rules="required|min:3|max:30|alpha_num" v-slot="{ errors }">

            <label for="password">Mot de passe</label>
            <input type="password" v-model="user.password" name="password" id="password">
            <div v-if="errors[0] !== undefined">
              <p>{{errors[0]}}</p>
            </div>

        </ValidationProvider>
        <div>
          <input class="button" type="submit" value="Connexion">
          <p>{{message}}</p>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import User from '../models/User';

export default {
name: "Login",
  data() {
    return {
      user: new User('','','',''),
      message: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if(this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {

    handleLogin() {
      this.$store.dispatch('auth/login', this.user)
          .then(res => {
            if(res.status === 200) {
              this.message = res.data.message;
              this.$router.push('/home');
            } else {
              this.message = res;
            }
          })
          .catch(error => {
            this.message = error;
          })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/form";
@import "src/scss/button";
</style>
