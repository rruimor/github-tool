<template>
  <article class="card">
    <router-link :to="{ path: `/commits` }">
      <p>{{ collaborator.login }}</p>
      <img class="avatar" :src="collaborator.avatar_url">
    </router-link>
  </article>
</template>

<script>
  export default {
    name: 'CollaboratorCard',
    props: {
      collaborator: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style>
  
</style>