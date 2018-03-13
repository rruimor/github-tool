<template>
  <div>
    <!-- Move to a helper / mixin? -->
    <div v-if="this.$store.state.user.auth">
      <h2>Welcome {{ displayName }}</h2>
      <!-- Render OrgsList Component -->
      <!-- <OrganizationsList
        :organizations="organizations"
      /> -->
      <OrganizationsList />
    </div>

    <div v-else>
      <Signin />
    </div>
  </div>
</template>

<script>
import Signin from './Signin.vue'
import OrganizationsList from './OrganizationsList.vue'

export default {
  name: 'home',
  components: { Signin, OrganizationsList },
  computed: {
    displayName: function() {
      return this.$store.state.user.displayName
    },
    // organizations: function() {
    //   return this.$store.state.orgs
    // }
  },
} 
</script>