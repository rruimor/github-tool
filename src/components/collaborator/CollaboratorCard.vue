<template>
  <article class="card">
    <header class="card__header">
      <img class="avatar" :src="collaborator.avatar_url">
      <p class="card__title">{{ collaborator.login }}</p>
    </header>
    <Promised :promise="getLastCommit">
      <div slot="pending">
        <Spinner/>
        <p>Loading last commit...</p>
      </div>

      <section
        slot="then"
        slot-scope="lastCommit"
        class="commit__wrapper"
      >
        <template v-if="Object.keys(lastCommit).length !== 0">
          <header>
            <p class="card__title">Last Commit</p>            
            <p>{{ lastCommit.commit.author.date | asTimeAgo }}</p>
          </header>
          <section class="card__section">
            <article>
              <blockquote class="quote">'{{ lastCommit.commit.message }}'</blockquote>
            </article>
            <article>
              <p>Branch: {{ lastCommit.branch.name }}</p>
              <a :href="lastCommit.html_url" target="_blank">Open in GitHub</a>
            </article>
          </section>
        </template>
        <p v-else>No commits found</p>
      </section>

      <p slot="catch" slot-scope="error">Error: {{ error.message }}</p>
    </Promised>
  </article>
</template>

<script>
  import Spinner from 'vue-simple-spinner'
  import Promised from 'vue-promised'

  export default {
    name: 'CollaboratorCard',
    components: {
      Spinner,
      Promised
    },
    computed: {
      getLastCommit: function() {
        return this.$store.dispatch('getLastCommit', { 
          ownerSlug: this.ownerSlug,
          repoSlug: this.repoSlug,
          author: this.collaborator.login
        })
      }
    },
    props: {
      collaborator: {
        type: Object,
        required: true
      },
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
  .commit__wrapper {
    display: flex;
    flex-direction: column;
    margin: 20px 0;
  }

  .quote {
    font-style: italic;
  }

  .card__section {
    margin: 20px 0;
  }
</style>