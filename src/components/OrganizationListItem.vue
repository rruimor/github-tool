<template>
  <li>
    {{ organization.login }}
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