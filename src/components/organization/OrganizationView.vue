<template>
  <div v-if="this.$store.getters.isUserLogged">
    <Promised :promise="getOrganization">
      <Spinner slot="pending" />
      <section slot="then" slot-scope="item">
        <template v-if="organization">
          <h1>{{ organization.login }}</h1>
          <img class="avatar" :src="organization.avatar_url" >
          <p v-if="organization.location">{{ organization.location }}</p>

          <OrganizationReposList :organizationSlug="organizationSlug" />

        </template>
        <template v-else>
          <p>{{ organizationSlug }} not found!</p>
        </template>
        <LinkBack />
      </section>
      <p slot="catch" slot-scope="error">Error: {{ error.message }}</p>
    </Promised>
  </div>
  <div v-else>
    <router-link to="/signin"><h3>Click here to sign in</h3></router-link>
  </div>
</template>

<script>
  import Spinner from 'vue-simple-spinner'
  import Promised from 'vue-promised'
  import OrganizationReposList from './OrganizationReposList.vue'
  import LinkBack from './../LinkBack.vue'
  
  export default {
    name: 'OrganizationView',
    components: {
      Spinner,
      Promised,
      LinkBack,
      OrganizationReposList
    },
    computed: {
      getOrganization: function() {
        return this.$store.dispatch('getOrg', this.organizationSlug)
      },
      organization: function() {
        return this.$store.state.organizations.current
      },
    },
    props: {
      organizationSlug: {
        type: String,
        required: true
      }
    }
  }
</script>