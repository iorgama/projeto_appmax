<template>
  <div>
    <div class="my-4">
      <h2>
        Modelos de relatórios
      </h2>
      <b-button @click="reportStock">Movimentação de produtos por dia</b-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
   methods: {
    reportStock() {
      this.$router.push({ name: 'admin.report.stock' })
    }
  }
}
</script>