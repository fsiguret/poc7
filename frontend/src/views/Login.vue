<template>
  <div class="login">
    <h1>Connexion</h1>
    <form>
      <div>
        <label for="email">E-mail : </label>
        <input type="text" name="email" id="email" required>
      </div>
      <div>
        <label for="password">Mot de passe : </label>
        <input type="text" name="password" id="password" required>
      </div>
      <div>
        <input v-on:click="signIn" type="submit" value="Connexion">
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
name: "Login",
  methods: {
    signIn(event) {
      const eMail = document.getElementById('email');
      const password = document.getElementById('password');
      event.preventDefault();
      axios
        .post("http://localhost:3000/api/auth/login", {
          email: eMail.value,
          password: password.value
        })
        .then(response => (console.log(response)))
        .catch(error => (console.log(error)))
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
