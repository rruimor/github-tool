<template>
  <!-- Add Repos / Paginated -->
  <article class="card">
    <header class="card__header">
      <p class="card__title">{{ repo.name }}</p>
    </header>
    <section class="card__content">
      <p>Private: {{ repo.private }}</p>
      <p v-if="repo.language">Language: {{ repo.language }}</p>
    </section>
  </article>
</template>

<script>
  export default {
    name: 'RepoCard',
    props: {
      repo: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
  .card {
    flex: 1 0 220px;
    box-sizing: border-box;
    margin: 1.5rem 1em;
    outline: 1px solid grey;
  }

  .card__header {
    padding: 10px;
    border-bottom: 1px solid;
    margin-bottom: 10px;
  }

  .card__title {
    font-weight: bold;
    font-size: 1.2em;
    margin: 0;
  }
</style>