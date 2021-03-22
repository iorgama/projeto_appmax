<template>
  <div>

    <a class="product-link"><router-link :to="{name: 'admin.products.create'}">Cadastrar produto</router-link></a>

    <table id="products">
      <thead>
        <th>Nome</th>
        <th>Fabricante</th>
        <th>Modelo</th>
        <th>Cor</th>
        <th>Quantidade</th>
        <th>SKU</th>
        <th width="100">AÇÕES</th>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td> {{ product.description}} </td>
          <td> {{ product.brand}} </td>
          <td> {{ product.model}} </td>
          <td> {{ product.color}} </td>
          <td> {{ product.amount}} </td>
          <td> {{ product.sku}} </td>
          <td> <router-link :to="{name: 'admin.products.editamount', params:{id: product.id}}"> Baixar Produto</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default{
  created(){
    this.$store.dispatch('loadProducts')
  },
  computed:{
    products(){
      return this.$store.state.products.items
    }
  }
}
</script>

<style>

</style>