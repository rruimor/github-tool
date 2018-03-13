<template>
  <div>
    <Spinner v-if="loading" />

    <ul v-if="organizations && organizations.length">
      <OrganizationListItem
        v-for="organization of organizations"
        :key="organization.id"
        :organization="organization"
      />
    </ul>
  </div>
</template>

<script>
  import OrganizationListItem from './OrganizationListItem.vue'
  import Spinner from 'vue-simple-spinner'

  export default {
    name: 'OrganizationsList',
    data() {
      return {
        loading: true,
        organizations: []
      }
    },
    // props: {
    //   organizations: {
    //     type: Array,
    //     required: true
    //   }
    // },
    components: {
      OrganizationListItem, Spinner
    },
    mounted() {
      let vm = this

      vm.$store.dispatch('getOrgs', { token: vm.$store.state.user.token })
      .then( () => { 
        vm.loading = false
        vm.organizations = vm.$store.state.orgs
      })
    }
  }
</script>