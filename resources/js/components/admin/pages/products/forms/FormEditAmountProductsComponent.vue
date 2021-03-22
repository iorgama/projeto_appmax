<template>
  <div>
    <form @submit.prevent="updateAmount">

      <label for="fstock">Quantidade em estoque:</label>
      <input type="text" id="fstock" :value="product.amount" readonly>

      <label for="famount">Quantidade a ser removida</label>
      <input type="text" id="famount" v-model="formData.amount">

      <button type="submit"> Enviar </button>
    </form>
  </div>
</template>

<script>
export default {  
  computed:{
    product(){
      return this.$store.getters.getProductById(this.id)
    }
  },
  data(){
    return{
      formData:{
        amount: ''  
      }    
    }
  },    
  props:{
    id: {
      require: true
    }
  },
  methods: {
    updateAmount(){
      if(this.formData.amount > this.product.amount){
        alert('Quantidade no estoque é insuficiente!');
      }else{
        this.$store.dispatch('editAmountProduct', {amount : this.formData.amount, id : this.id})
        .then(() => this.$router.push({name: 'admin.products'})) 
        .catch();
      }    
    }
  },
}
</script>