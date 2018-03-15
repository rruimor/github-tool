<template>
  <Promised :promise="getCollaborators">
      <Spinner slot="pending" />

      <section
        slot="then"
        slot-scope="items"
        class="collaborators__list cards"
      >
        <template v-if="collaborators && collaborators.length">
          <CollaboratorCard
            v-for="collaborator in collaborators"
            :collaborator="collaborator"
            :key="collaborator.id"
          />
        </template>

        <p v-else>You don't have permissions to see the collaborators for this repo.</p>
      </section>

      <p slot="catch" slot-scope="error">Error: {{ error.message }}</p>
    </Promised>
</template>

<script>
  import Spinner from 'vue-simple-spinner'
  import Promised from 'vue-promised'
  import CollaboratorCard from './../collaborator/CollaboratorCard.vue'
  
  export default {
    name: 'RepoCollaboratorsList',
    components: {
      Spinner,
      Promised,
      CollaboratorCard
    },
    computed: {
      getCollaborators: function() {
        return this.$store.dispatch('getRepoCollaborators', { 
          ownerSlug: this.ownerSlug,
          repoSlug: this.repoSlug
        })
      },
      collaborators: function() {
        return this.$store.state.repos.current.collaborators
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

<style scoped>
</style>