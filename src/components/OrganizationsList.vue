<template>
  <div>
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

  export default {
    name: 'OrganizationsList',
    props: {
      organizations: {
        type: Array,
        required: true
      }
    },
    components: {
      OrganizationListItem
    }
  }
</script>