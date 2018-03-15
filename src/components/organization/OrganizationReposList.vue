<template>
  <!-- Add Repos / Paginated -->
  <Promised :promise="getOrganizationRepos">
    <Spinner slot="pending" />

    <section
      slot="then"
      slot-scope="item"
      v-if="organizationRepos"
      class="repos__list cards"
    >
      <RepoCard
        :repo="repo"
        :key="repo.id"
        v-for="repo in organizationRepos"
      />
    </section>

    <p slot="catch" slot-scope="error">Error: {{ error.message }}</p>
  </Promised>
</template>

<script>
  import Spinner from 'vue-simple-spinner'
  import Promised from 'vue-promised'
  import RepoCard from './../repo/RepoCard.vue'

  export default {
    name: 'OrganizationReposList',
    components: {
      Promised,
      Spinner,
      RepoCard
    },
    computed: {
      getOrganizationRepos: function() {
        return this.$store.dispatch('getOrgRepos', this.organizationSlug)
      },
      organizationRepos: function() {
        return this.$store.state.organizations.current.repos
      }
    },
    props: {
      organizationSlug: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
  .repos__list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 5%;
  }
</style>