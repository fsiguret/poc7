<template>
  <div class="login">
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">E-mail : </label>
        <input type="text" v-model="user.email" v-validate="'required'" name="email" id="email">
        <div v-if="errors.has('email')">
          <p>L'adresse élèctronique est requise !</p>
        </div>
      </div>
      <div>
        <label for="password">Mot de passe : </label>
        <input type="password" v-model="user.password" v-validate="'required'" name="password" id="password">
        <div v-if="errors.has('password')">
          <p>Le mot de passe est requis !</p>
        </div>
      </div>
      <div>
        <input type="submit" value="Connexion">
        <p>{{message}}</p>
      </div>
    </form>
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
      this.$validator.validateAll()
          .then( isValid => {
            if (isValid) {
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
          })
          .catch( error => {
            this.message = error;
          });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
