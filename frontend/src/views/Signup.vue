<template>
  <section>
    <h1>Inscription</h1>
    <form>
      <div>
        <label for="firstName">Prénom : </label>
        <input type="text" v-model="user.firstName" name="firstName" id="firstName">
      </div>
      <div>
        <label for="lastName">Nom : </label>
        <input type="text" v-model="user.lastName" name="lastName" id="lastName">
      </div>
      <div>
        <label for="email">E-mail</label>
        <input type="text" v-model="user.email" name="email" id="email">
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input type="password" v-model="user.password" name="password" id="password">
      </div>
      <div>
        <input v-on:click="signUp" type="submit" value="Inscription">
      </div>
    </form>
    <aside>{{ message }}</aside>
  </section>
</template>

<script>
//import axios from 'axios';
import authService from '../services/auth-service';
import User from "@/models/User";

export default {

name: "Signup",
  data() {
    return {
      user: new User('', '', '', ''),
      message: ""
    };
  },
  methods: {
    signUp(event) {

      event.preventDefault();

      authService.signup(this.user)
          .then(response => {
            this.message = response;

            authService.login(this.user)
                .then(() => {
                  this.$router.push('/');
                })
                .catch(() => {
                  this.message = "impossible de ce connecter.";
                })
          })
          .catch(error => {
            this.message = error;
          });
    }
  }
}
</script>

<style scoped>

</style>
