<template>
  <div>
    <div>
      <form @submit.prevent="onSubmit">
        <label for="fdescription">Descrição</label>
        <input type="text" id="fdescription" v-model="formData.description">

        <label for="fbrand">Fabricante</label>
        <input type="text" id="fbrand" v-model="formData.brand">

        <label for="fmodel">Modelo</label>
        <input type="text" id="fmodel" v-model="formData.model">

        <label for="fcolor">Cor</label>
        <input type="text" id="fcolor" v-model="formData.color">

        <label for="fsku">SKU</label>
        <input type="text" id="fsku" :value="sku" readonly>     
        <small> A SKU é gerada a partir dos três primeiros caracteres da descrição do produto mais o primeiro caractere do fabricante mais os dois primeiros caracteres do modelo e por último os dois primeiros caracteres da cor.</small>
        <br />
        <button type="submit"> Enviar </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  computed:{
    //Dynamically create the sku.
    sku(){
      const description = this.formData.description.substring(0,3);
      const brand = this.formData.brand.substring(0, 1);
      const model = this.formData.model.substring(0, 2);
      const color = this.formData.color.substring(0, 2);
      return [description, brand, model,color].join('').toUpperCase();
    }
  },
  props: {
      formData:{
        default:() => {
          return {
            description: '',
            brand: '',
            model: '',
            color: ''
          }
        }
      }    
  },
  methods: {
    onSubmit(){
      this.$store.dispatch('storeProduct', {...this.formData, sku: this.sku})
      .then(() => this.$router.push({name: 'admin.products'})) 
      .catch();
    }
  },
}
</script>