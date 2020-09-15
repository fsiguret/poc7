<template>
  <div class="profile">
    <h1>Votre Profil</h1>
    <section>
      <h2>Informations personnelles</h2>
      <ul>
        <li>Nom : {{user.firstName}}</li>
        <li>Prénom : {{user.lastName}}</li>
        <li>Adresse élèctronique : {{user.email}}</li>
      </ul>

      <form @submit.prevent="deleteUser">
        <label for="password">Mot de passe : </label>
        <input v-model="password" name="password" id="password" v-validate="'required'" type="password" placeholder="Saisissez votre mot de passe.">
        <input type="submit" value="Désinscription">
        <div v-if="errors.has('password')">
          <p>Veuillez saisir votre mot de passe pour confirmer la suppression de votre compte.</p>
        </div>
      </form>
      <p> {{ message }}</p>
    </section>
    <section>
      <h2>Derniers articles posté</h2>
    </section>
    <section>
      <h2>Derniers commentaires posté</h2>
    </section>
  </div>
</template>

<script>
import User from "@/models/User";
import AuthService from "@/services/auth-service";

export default {
  name: 'About',
  data() {
    return {
      user: '',
      password:'',
      message: ''
    }
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem('user'));

    AuthService.getUser(user.userId)
        .then(response => {
          this.user = new User(response.data.results[0].userId, response.data.results[0].firstName, response.data.results[0].lastName , response.data.results[0].email, '', response.data.results[0].rank)
        })
        .catch(error => {
          this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        });
  },
  methods: {
    deleteUser() {
      let data = {
        email: this.user.email,
        userId: this.user.userId,
        password: this.password
      };

      AuthService.deleteUser(data)
          .then(response => {
            this.message = response.data
            this.$store.dispatch('auth/logout');
            this.$router.push('/');
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
