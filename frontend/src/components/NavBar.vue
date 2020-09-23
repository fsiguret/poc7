<template>
  <nav>
    <div v-if="isLogged">
      <router-link to="/home">Accueil</router-link>
      <router-link to="/user-profile">Profil</router-link>
      <a href @click.prevent="logOut">Déconnexion</a>
    </div>
    <div v-else>
      <router-link to="/">Connexion</router-link>
      <router-link to="/signup">Inscription</router-link>
    </div>
  </nav>
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

nav {
  padding: 30px;

  a {
    outline: none;
    text-decoration: none;
    font-weight: bold;
    color: white;
    font-size: 1.5rem;

    padding: 1rem;

    &.router-link-exact-active {
      color: $elementColor;
    }

    &:hover {
      color: $elementColorHover;
    }
  }
}
</style>
