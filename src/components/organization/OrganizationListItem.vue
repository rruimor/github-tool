<template>
  <li>
    <router-link
      :to="{ path: `/organizations/${organization.login}` }"
    >{{ organization.login }}</router-link>
  </li>
</template>

<script>
  export default {
    name: 'OrganizationListItem',
    props: {
      organization: {
        type: Object,
        required: true
      }
    }
  }  
</script>