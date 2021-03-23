<template>
  <div>

    <div class="my-4">
      <router-link :to="{name: 'admin.products.create'}" custom v-slot="{ navigate }">
        <b-button @click="navigate">Cadastrar produto</b-button>
      </router-link>
    </div>

    <b-table striped hover :fields="fields" :items="items" responsize="sm">
      <!-- A virtual column -->
      <template #cell(id)="data">
        <router-link :to="{
          name: 'admin.products.inventory',
          params: { id: data.value }
        }">
          Entrada/Saída
        </router-link>
      </template>
    </b-table>
  </div>
</template>

<script>
export default{
  created(){
    this.$store.dispatch('loadProducts')
  },
  computed: {
    items(){
      return this.$store.state.products.items
    }
  },
  data() {
    return {
      fields: [
        { key: 'description', label: 'Descrição', sortable: true },
        { key: 'brand', label: 'Fabricante', sortable: true },
        { key: 'model', label: 'Modelo' },
        { key: 'color', label: 'Cor' },
        { key: 'sku', label: 'SKU' },
        { key: 'id', label: 'Ações' },
      ],
    }
  }
}
</script>

<style>

</style>