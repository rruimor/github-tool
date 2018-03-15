<template>
  <!-- Add members / Paginated -->
  <Promised :promise="getOrganizationMembers">
    <Spinner slot="pending" />

    <ul slot="then" slot-scope="item" v-if="OrganizationMembers">
      <li v-for="member in OrganizationMembers">
        <img class="avatar" :src="member.avatar_url">
        <p>{{ member.login }}</p>
      </li>
    </ul>

    <p slot="catch" slot-scope="error">Error: {{ error.message }}</p>
  </Promised>
</template>

<script>
  import Spinner from 'vue-simple-spinner'
  import Promised from 'vue-promised'

  export default {
    name: 'OrganizationMembersList',
    computed: {
      getOrganizationMembers: function() {
        return this.$store.dispatch('getOrgMembers', this.organizationSlug)
      },
      OrganizationMembers: function() {
        return this.$store.state.organizations.current.members
      }
    },
    props: {
      organizationSlug: {
        type: String,
        required: true
      }
    }
  }
</script>