<template>
  <section>
    <h1>Inscription</h1>
    <form @submit.prevent="signUp">
      <div>
        <label for="firstName">Prénom : </label>
        <input type="text" v-model="user.firstName" v-validate="'required'" name="firstName" id="firstName">
        <div
            v-if="errors.has('firstName')"
        >
          <p>Le prénom est requis !</p>
        </div>
      </div>
      <div>
        <label for="lastName">Nom : </label>
        <input type="text" v-model="user.lastName" v-validate="'required'" name="lastName" id="lastName">
        <div
            v-if="errors.has('lastName')"
        >
          <p>Le nom est requis !</p>
        </div>
      </div>
      <div>
        <label for="email">E-mail</label>
        <input type="text" v-model="user.email" v-validate="'required'" name="email" id="email">
        <div
            v-if="errors.has('email')"
        >
          <p>L'e-mail est requis !</p>
        </div>
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input type="password" v-model="user.password" v-validate="'required'" name="password" id="password">
        <div
            v-if="errors.has('password')"
        >
          <p>Le mot de passe est requis !</p>
        </div>
      </div>
      <div>
        <input type="submit" value="Inscription">
      </div>
    </form>
    <aside>{{ message }}</aside>
  </section>
</template>

<script>

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
    signUp() {
      this.$validator.validateAll().then(isValid => {
        if(isValid) {
          this.$store.dispatch('auth/register', this.user)
              .then(res => {
                if(res.status !== 201) {
                  this.message = res;
                  return;
                }

                this.$store.dispatch('auth/login', this.user)
                    .then(res => {
                      if(res.status !== 200) {
                        this.message = res;
                        return;
                      }
                      this.$router.push('/home');
                    })
                    .catch(error => {
                      return error;
                    })
              })
              .catch(error => {
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
              });
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
