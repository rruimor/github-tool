<template>
  <section v-if="this.$store.getters.isUserLogged">
    <Promised :promise="getRepo">
      <Spinner slot="pending" />
      <section slot="then" slot-scope="item">
        <template v-if="repo">
          <h1>{{ repo.full_name }}</h1>
          <RepoCollaboratorsList
            :ownerSlug="ownerSlug"
            :repoSlug="repoSlug"
          />
        </template>
        <template v-else>
          <p>{{ repoSlug }} not found!</p>
        </template>
        <LinkBack />
      </section>
      <p slot="catch" slot-scope="error">Error: {{ error.message }}</p>
    </Promised>
  </section>
  <router-link v-else to="/signin"><h3>Click here to sign in</h3></router-link>
</template>

<script>
  import Spinner from 'vue-simple-spinner'
  import Promised from 'vue-promised'
  import RepoCollaboratorsList from './RepoCollaboratorsList.vue'
  import LinkBack from './../LinkBack.vue'
  
  export default {
    name: 'RepoView',
    components: {
      Spinner,
      Promised,
      LinkBack,
      RepoCollaboratorsList
    },
    computed: {
      getRepo: function() {
        return this.$store.dispatch('getRepo', { 
          ownerSlug: this.ownerSlug,
          repoSlug: this.repoSlug
        })
      },
      repo: function() {
        return this.$store.state.repos.current
      },
    },
    props: {
      ownerSlug: {
        type: String,
        required: true
      },
      repoSlug: {
        type: String,
        required: true
      }
    }
  }
</script>

<style>
  
</style>