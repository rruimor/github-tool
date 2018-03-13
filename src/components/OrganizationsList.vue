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
    computed: {
      organizations: function() {
        return this.$store.state.orgs
      },
    },
    mounted() {
      let vm = this

      vm.$store.dispatch('getOrgs', { token: vm.$store.state.user.token })
      .then( () => { 
        vm.loading = false
      })
    }
  }
</script>