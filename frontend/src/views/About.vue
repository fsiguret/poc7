<template>
  <div class="profile">
    <h1>Votre Profil</h1>
    <section class="infoPerso">
      <h2>Informations personnelles</h2>
      <ul class="infoPerso-list">
        <li><span>Nom : </span><span>{{user.firstName}}</span></li>
        <li><span>Prénom : </span><span>{{user.lastName}}</span></li>
        <li><span>Adresse élèctronique : </span><span>{{user.email}}</span></li>
      </ul>

      <button class="button btn-suppr" v-if="!wantSuppr" @click.prevent="showValidDelete">Suprimer votre compte</button>
      <ValidationObserver v-if="wantSuppr" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(deleteUser)">
          <ValidationProvider name="mot de passe" rules="required|min:3|max:30|alpha_num" v-slot="{ errors }">
            <label for="password">Mot de passe</label>
            <input v-model="password" name="password" id="password" type="password" placeholder="Saisissez votre mot de passe.">
            <input class="button" type="submit" value="Suprimer votre compte">
            <div v-if="errors[0] !== undefined">
              <p>{{errors[0]}}</p>
            </div>
          </ValidationProvider>
          <p>{{ message }}</p>
        </form>
      </ValidationObserver>
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
      message: '',
      wantSuppr: false
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
            this.showValidDelete();
            this.$store.dispatch('auth/logout');
            this.$router.push('/');
          })
          .catch(error => {
            this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
          });
    },
    showValidDelete() {
      this.wantSuppr = !this.wantSuppr;
    }
  }
}
</script>
<style scoped lang="scss">
@import "src/scss/button";
@import "src/scss/form";

.infoPerso {
  background-color: white;
  width: 50%;
  margin: auto;
  padding: 2rem 3rem;
  box-shadow: 0 0 6px 1px darkgrey;
  border-radius: 0.1rem;
  &-list {
    list-style: none;
    text-align: left;
    li {
      margin: auto;
      width: 70%;
      display: flex;
      justify-content: center;
      padding: 1rem;
      border-bottom: solid darkgrey 1px;

      span {
        width: 30%;
      }
    }
  }
  form {
    margin-top: 2rem;
    width: 40%;
  }
  .btn-suppr {
    width: 25%;
  }

}

</style>
