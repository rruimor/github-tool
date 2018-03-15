<template>
  <!-- Add Repos / Paginated -->
  <article class="card">
    <router-link :to="{ path: `/repos/${repo.owner.login}/${repo.name}` }">
      <header class="card__header">
        <p class="card__title">{{ repo.name }}</p>
      </header>
      <section class="card__content">
        <p>Private: {{ repo.private }}</p>
        <p v-if="repo.language">Language: {{ repo.language }}</p>
      </section>
    </router-link>
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

<style>
</style>