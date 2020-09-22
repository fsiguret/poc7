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

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
