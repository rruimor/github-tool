<template>
  <div id="app">
    <h1>{{msg}}</h1>
    <nav v-if="this.$store.getters.isUserLogged">
      <router-link to="/">Home</router-link> |
      <a href="/logout" @click="signOut">Log Out</a>
    </nav>
    <hr />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'GitHub Tools'
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
    }
  },
  mounted() {
    this.$store.dispatch('getUser')
  },
  created() {
    this.$store.dispatch('tryAutoLogin')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}

.avatar {
  max-width: 100px;
}

.cards {
    display: flex;
    flex-wrap: wrap;
    margin: 30px 5%;
    justify-content: center;
  }

.card {
  flex: 1 0 220px;
  box-sizing: border-box;
  margin: 1.5rem 1em;
  outline: 1px solid grey;
}

.card__header {
  padding: 10px;
  border-bottom: 1px solid;
  margin-bottom: 10px;
}

.card__title {
  font-weight: bold;
  font-size: 1.2em;
  margin: 0;
}
</style>
