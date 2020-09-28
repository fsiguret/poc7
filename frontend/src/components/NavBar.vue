<template>
  <div>
    <a href="#nav" class="open"><font-awesome-icon class="burger" icon="bars"></font-awesome-icon></a>
    <nav id="nav">
      <div v-if="isLogged">
        <a href="#" class="close"><font-awesome-icon icon="times"></font-awesome-icon></a>
        <div>
          <router-link to="/home">Accueil</router-link>
          <router-link to="/user-profile">Profil</router-link>
          <a href @click.prevent="logOut">Déconnexion</a>
        </div>
      </div>
      <div v-else>
        <a href="#" class="close"><font-awesome-icon icon="times"></font-awesome-icon></a>
        <div>
          <router-link to="/">Connexion</router-link>
          <router-link to="/signup">Inscription</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
name: "NavBar",
  props: [
      "isLogged"
  ],
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>

@import "src/scss/_variables.scss";

div {
  .burger {
    color: white;
    font-size: 3rem;
    margin-right: 2rem;

    &:hover {
      color: $elementColorHover;
    }
  }
  #nav {
    position: fixed;
    top: 0;
    height: 100%;
    width: 80%;
    max-width: 400px;
    background-color: #2b2929;

    &:not(:target) {
      right: -100%;
      transition: right 1s;
    }
    &:target {
      right: 0;
      transition: right 0.5s;
    }

    div {
      display: flex;
      flex-direction: column;
      color: white;

      a {
        outline: none;
        text-decoration: none;
        color: white;

        &.router-link-exact-active {
          color: $elementColor;
        }

        &:hover {
          color: $elementColorHover;
        }
      }
      .close {
        display: inline;
        text-align: left;

        svg {
          font-size: 2rem;
          padding: 1rem;

        }
      }

      div {
        font-size: 2rem;
        a {
          padding: 2rem 0 2rem 0;
        }

        &.router-link-exact-active {
          color: $elementColor;
        }

        &:hover {
          color: $elementColorHover;
        }
      }
    }
  }




}
</style>
