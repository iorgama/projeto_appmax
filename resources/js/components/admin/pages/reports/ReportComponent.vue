<template>
  <div>
    <h1> Relatório de produtos </h1>
    <div>
      <button @click="reportStock"> Movimentação de produtos por dia</button>
    </div>
        <router-view></router-view>
  </div>
</template>

<script>
export default {
   methods:{
    reportStock(){
      console.log('teste')
      this.$router.push({name: 'admin.report.stock'})
    }
  }
}
</script>