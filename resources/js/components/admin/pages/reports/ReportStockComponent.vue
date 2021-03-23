<template>
  <div>
    <b-table striped hover :fields="fields" :items="items" responsize="sm" />
  </div>
</template>

<script>
export default{
  mounted() {
    this.$store.dispatch('loadReportStock')
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
    }
  }
}
</script>

<style>

</style>