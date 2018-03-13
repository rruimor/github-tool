<template>
  <div>
    <!-- Move to a helper / mixin? -->
    <div v-if="this.$store.state.user.auth">
      <h2>Welcome {{ displayName }}</h2>      
    </div>

    <div v-else>
      <Signin />
    </div>
  </div>
</template>

<script>
import Signin from './Signin.vue'

export default {
  name: 'home',
  components: { Signin },
  computed: {
    displayName: function() {
      return this.$store.state.user.displayName
    }
  }
} 
</script>