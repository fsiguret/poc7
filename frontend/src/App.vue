<template>
  <div id="app">
    <header>
      <nav id="nav">
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
    </header>
    <main>
      <router-view/>
    </main>
    <footer>
      <p>Copyright</p>
    </footer>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
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
<script>
export default {
  data() {
    return {
      isLogged: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    this.isLogged = this.currentUser;
  },
  updated() {
    this.isLogged = this.currentUser;
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }
  }
}
</script>
