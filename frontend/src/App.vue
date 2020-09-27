<template>
  <div id="app">
    <header class="header">
      <img src="./assets/icon-left-font-monochrome-white.svg" alt="le logo groupomania en rouge" @click.prevent="goHome">
      <NavBar v-bind:isLogged="isLogged"/>
    </header>
    <main>
      <router-view/>
    </main>
    <footer class="footer">
      <p>Copyright</p>
    </footer>
  </div>
</template>

<style lang="scss">
@import "scss/variables";

html, body, #app {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;

  background-color: $beige;

  h1 {
    font-size: 2rem;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }

  .header {
    background-color: $backgroundColor;
    display: flex;
    justify-content: space-between;

    img {
      cursor: pointer;
      margin: auto 2rem;
      width: 250px;
      height: 50px;

      &:hover {
        filter: invert(47%) sepia(64%) saturate(1143%) hue-rotate(319deg) brightness(111%) contrast(93%);
      }
    }
  }
  .footer {
    margin-top: 1rem;
    background-color: $backgroundColor;
    p {

      padding: 2rem;
      color: white;
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
  },
  methods: {
    goHome() {
      this.$router.push("/");
    }
  }
}
</script>
