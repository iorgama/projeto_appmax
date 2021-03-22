<template>
  <div>
    <form @submit.prevent="onSubmit">

      <label for="fdescription">Descrição do Produto:</label>
      <input type="text" id="fdescription" :value="description" readonly>

      <label for="ftype">Tipo de movimentação</label>
      <select v-model="formData.type">>
        <option value="E"> Entrada </option>
        <option value="S"> Saída </option>
      </select>

      <label for="famount">Quantidade disponível em estoque:</label>
      <input type="text" id="famount" readonly :value="amountProduct">

      <label for="famount">Quantidade:</label>
      <input type="text" id="famount" v-model="formData.amount">    
      
      <button type="submit"> Enviar </button>
    </form>
  </div>
</template>

<script>
export default {  
  created() {
    this.$store
      .dispatch("amountProduct", {id: this.id});
  },
  computed:{
    description(){
      const product = this.$store.getters.getProductById(this.id);
      return product.description + " da marca " + product.brand
    },
    amountProduct(){      
      return this.$store.state.inventories.amount
    }
  },  
  data(){
    return{
      formData:{
        amount: 0, 
        type: 'E' 
      }    
    }
  },    
  props:{
    id: {
      require: true
    }
  },
   methods: {
    onSubmit(){
      if(this.formData.type === 'S' && this.formData.amount > this.$store.state.inventories.amount){
        alert("There is not enough stock to be removed.")
      }else{
        this.$store.dispatch('storeInventory', {...this.formData, product_id: this.id})
        .then(() => this.$router.push({name: 'admin.products'})) 
        .catch();
      }
    }
  },
}
</script>