<template>
  <div>
    <div v-if="this.$store.getters.isUserLogged">
      <h2>Welcome {{ displayName }}</h2>
      <OrganizationsList />
    </div>

    <div v-else>
      <Signin />
    </div>
  </div>
</template>

<script>
import Signin from '../auth/Signin.vue'
import OrganizationsList from '../organization/OrganizationsList.vue'

export default {
  name: 'home',
  components: { Signin, OrganizationsList },
  computed: {
    displayName: function() {
      return this.$store.state.user.displayName
    },
  },
} 
</script>