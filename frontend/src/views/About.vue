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
            <input class="button supprAccount" type="submit" value="Supprimer">

            <div v-if="errors[0] !== undefined">
              <p>{{errors[0]}}</p>
            </div>

          </ValidationProvider>

          <p>{{ message }}</p>

        </form>

      </ValidationObserver>
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
          this.user = new User(response.data.results.userId, response.data.results.firstName, response.data.results.lastName , response.data.results.email, '', response.data.results.rank)
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

  @media screen and (max-width: 1750px){
    width: 60%;
  }
  @media screen and (max-width: 1460px){
    width: 70%;
  }
  @media screen and (max-width: 1250px){
    width: 80%;
  }
  @media screen and (max-width: 1100px) {
    width: 90%;
    padding: 1rem;
  }

  &-list {
    list-style: none;
    text-align: left;

    @media screen and (max-width: 1100px){
      padding: 0.2rem;
    }

    li {
      margin: auto;
      width: 70%;
      display: flex;
      justify-content: center;
      padding: 1rem;
      border-bottom: solid darkgrey 1px;

      @media screen and (max-width: 1100px){
        width: 90%;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      span {
        width: 30%;

        @media screen and (max-width: 1100px){
          width: 100%;
        }
      }
    }
  }

  form {
    margin-top: 2rem;
    width: 40%;

    @media screen and (max-width: 1060px){
      .supprAccount {
        width: 100%;
        display: inline-block;
      }
    }
  }

  .button {

    @media screen and (max-width: 1100px){
      width: 50%;
    }
  }

  .btn-suppr {
    width: 25%;

    @media screen and (max-width: 1100px){
      width: 50%;
    }
  }
}
</style>
