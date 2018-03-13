<template>
  <div v-if="this.$store.state.user.auth">
    <h3>Dashboard {{this.$store.state.user.displayName}}</h3>
    <h4>Count: {{this.$store.state.counts.count.count}}</h4>
    <button class="btn btn-primary" @click="incCount()">Increment Count</button>
    <button class="btn btn-primary" @click="getOrgs()">Get Orgs</button>
    <button class="btn btn-primary" @click="getCompetaRepos()">Get Repos</button>
  </div> 
  <div v-else>
    <router-link to="/signin"><h3>Click here to sign in</h3></router-link>
  </div>
</template>

<script>
export default {
  methods: {
    incCount() {
      this.$store.dispatch('incCount', this.$store.state.counts.count.count)
    },
    getOrgs() {
      this.$store.dispatch('getOrgs', {
        token: this.$store.state.user.oauthToken
      })
    },
    getCompetaRepos() {
      this.$store.dispatch('getReposForOrg', { 
        token: this.$store.state.user.oauthToken,
        org: 'Competa-IT'
      })
    }
  },
  mounted() {
    this.$store.dispatch('getCount')
    this.$store.dispatch('getUser')
  }
}
</script>
