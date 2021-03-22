<template>
  <div>
    <ul>
      <li>
        <router-link :to="{name: 'admin.products'}"> Produtos </router-link>
      </li>
      <li>
        <router-link :to="{name: 'admin.report'}"> Relatórios </router-link>
      </li>
      <li>
        {{me.name}} <button @click="logout">Logout</button>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store
      .dispatch("checkLogin")
      .then(() => router.push({ name: "home" }))
      .catch(error => {});
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.replace({ name: "login" })
      })
    }
  },
  computed:{
    me() {
      return this.$store.state.auth.me
    }
  }
}
</script>

<style>

</style>