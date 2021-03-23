<template>
  <div>
    <navbar />
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Navbar from '../layout/navbar/NavbarComponent'

export default {
  components: {
    Navbar
  },
  mounted() {
    this.$store
      .dispatch("checkLogin")
      .then(() => router.push({ name: "home" }))
      .catch(error => {});
  },
}
</script>

<style>

</style>