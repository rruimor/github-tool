<template>
  <a href="#" @click="goBack">Back</a>
</template>

<script>
  export default {
    name: 'LinkBack',
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>