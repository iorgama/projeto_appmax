<template>
  <div>
    <table id="products">
      <thead>
        <th>Data da movimentação</th>
        <th>Descrição do produto</th>
        <th>Quantidade</th>
        <th>Tipo de movimentação</th>
        <th>Avisos</th>
      </thead>
      <tbody>
        <tr v-for="(row, index) in reports" :key="index">
          <td> {{ row.date}} </td>
          <td> {{ row.description}} </td>
          <td> {{ row.daily_amount}} </td>
          <td> {{ row.type}} </td>
          <td> {{ row.low_amount}} </td>
          
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default{
  created(){
    this.$store.dispatch('loadReportStock')
  },
  computed:{
    reports(){
      return this.$store.state.reports.items
    }
 }
}
</script>

<style>

</style>