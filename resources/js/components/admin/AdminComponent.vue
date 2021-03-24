<template>
  <div>
    <navbar :isLoading="isLoading" :logout="logout" :user="user" />
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import {TokenStorage} from '../../services/tokenStorage';
import Navbar from '../layout/navbar/NavbarComponent';

export default {
  components: {
    Navbar
  },
  created() {
    this.checkLogin()
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.me
    }
  },
  methods: {
    async checkLogin() {
      try {
        this.isLoading = true
        await this.$store.dispatch("checkLogin")
      } catch (error) {
        // if an error is thrown when refetching the user
        // takes him back to login and removes the token 
        TokenStorage.removeToken()
        this.$router.replace({ name: "login" });
      } finally {
        this.isLoading = false
      }
    },
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.replace({ name: "login" })
    }
  },
}
</script>

<style>

</style>