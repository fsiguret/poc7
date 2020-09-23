<template>
  <section>
    <h1>Inscription</h1>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(signUp)">
        <ValidationProvider name="Prénom" rules="required|alpha_dash|min:3|max:60" v-slot="{ errors }">
            <label for="firstName">Prénom</label>
            <input type="text" v-model="user.firstName" name="firstName" id="firstName">
            <div v-if="errors[0] !== undefined">
              <p>{{ errors[0] }}</p>
            </div>
        </ValidationProvider>
        <ValidationProvider name="Nom" rules="required|alpha_dash|min:3|max:60" v-slot="{ errors }">
          <label for="lastName">Nom</label>
          <input type="text" v-model="user.lastName" name="lastName" id="lastName">
          <div v-if="errors[0] !== undefined">
            <p>{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
        <ValidationProvider name="E-mail" rules="required|email" v-slot="{ errors }">
          <label for="email">E-mail</label>
          <input type="text" v-model="user.email" name="email" id="email">
          <div v-if="errors[0] !== undefined">
            <p>{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
        <ValidationProvider name="Mot de passe" rules="required|min:3|max:30|alpha_num" v-slot="{ errors }">
          <label for="password">Mot de passe</label>
          <input type="password" v-model="user.password" name="password" id="password">
          <div v-if="errors[0] !== undefined">
            <p>{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
        <div>
          <input class="button" type="submit" value="Inscription">
        </div>
        <p>{{ message }}</p>
      </form>
    </ValidationObserver>


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
      this.message = '';

      this.$store.dispatch('auth/register', this.user)
          .then(res => {
            if (res.status !== 201) {
              this.message = res;
              return;
            }

            this.$store.dispatch('auth/login', this.user)
                .then(res => {
                  if (res.status !== 200) {
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
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/form";
  @import "src/scss/button";
</style>
