<template>
  <div>
    <div class="d-flex justify-content-center" v-if="isLoading">
      <b-spinner label="Spinning" variant="primary" />
    </div>
    <b-table striped hover :fields="fields" :items="items" responsize="sm" v-else />
  </div>
</template>

<script>
export default {
  created() {
    this.loadReportStock()
  },
  computed: {
    items() {
      return this.$store.state.reports.items
    }
  },
  data() {
    return {
      fields: [
        { key: 'date', label: 'Data da movimentação', sortable: true },
        { key: 'description', label: 'Descrição do produto' },
        { key: 'daily_amount', label: 'Quantidade' },
        { key: 'type', label: 'Tipo de movimentação',sortable: true },
        { key: 'low_amount', label: 'Aviso' },
      ],
      isLoading: false,
    }
  },
  methods: {
    addToast(message) {
      this.$bvToast.toast(message, {
        title: 'Erro',
        autoHideDelay: 5000,
      })
    },
    async loadReportStock() {
      try {
        this.isLoading = true
        await this.$store.dispatch('loadReportStock')
      } catch (error) {
        const { message } = error
        this.addToast(message)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style>

</style>