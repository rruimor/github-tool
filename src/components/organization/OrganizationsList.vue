<template>
  <div>
    <Promised :promise="getOrganizations">
      <Spinner slot="pending" />
      <ul slot="then" slot-scope="items">
        <OrganizationListItem
          v-for="item of organizations"
          :key="item.id"
          :organization="item"
        />
      </ul>
      <p slot="catch" slot-scope="error">Error: {{ error.message }}</p>
    </Promised>
  </div>
</template>

<script>
  import OrganizationListItem from './OrganizationListItem.vue'
  import Spinner from 'vue-simple-spinner'
  import Promised from 'vue-promised'

  export default {
    name: 'OrganizationsList',
    data() {
      return {
        loading: true,
      }
    },
    components: {
      OrganizationListItem,
      Spinner,
      Promised
    },
    computed: {
      getOrganizations: function() {
        return this.$store.dispatch('getOrgs', { token: this.$store.state.user.token })
      },
      organizations: function() {
        return this.$store.state.organizations.items
      },
      organizationsLoaded: function() {

      }
    }
  }
</script>