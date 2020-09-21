<template>
  <div id="app">
    <header>
      <NavBar v-bind:isLogged="isLogged"/>
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
import NavBar from "@/components/NavBar";
export default {
  components: {
    NavBar
  },
  data() {
    return {
      isLogged: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    this.isLogged = this.currentUser;
  },
  updated() {
    this.isLogged = this.currentUser;
  }
}
</script>
