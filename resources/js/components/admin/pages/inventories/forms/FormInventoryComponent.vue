<template>
  <div>
    <b-form @submit.prevent="onSubmit">

      <b-form-group
        id="fdescription-group"
        label="Descrição do produto"
        label-for="fdescription"
      >
        <b-form-input
          id="fdescription"
          :value="description"
          type="text"
          readonly
        />
      </b-form-group>

      <b-form-group
        id="ftype-group"
        label="Tipo de movimentação"
        label-for="ftype"
      >
        <b-form-select v-model="formData.type" :options="options"></b-form-select>
      </b-form-group>

      <b-form-group
        id="fstock-group"
        label="Quantidade disponível em estoque"
        label-for="fstock"
      >
        <b-form-input
          id="fstock"
          :value="amountProduct"
          type="text"
          readonly
        />
      </b-form-group>

      <b-form-group
        id="famount-group"
        label="Quantidade"
        label-for="famount"
      >
        <b-form-input
          id="famount"
          v-model="formData.amount"
          type="text"
          placeholder="Insira a quantidade a ser adicionada ou retirada"
          required
        />
      </b-form-group>

      <div class="mt-4">
        <b-button type="submit" block variant="primary" :disabled="isLoading">
          {{isLoading ? 'Cadastrando movimentação...' : 'Cadastrar'}}
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {  
  created() {
    this.$store
      .dispatch("amountProduct", {id: this.id});
  },
  computed:{
    description() {
      const product = this.$store.getters.getProductById(this.id);
      return product.description + " da marca " + product.brand
    },
    amountProduct() {      
      return this.$store.state.inventories.amount
    }
  },  
  data() {
    return {
      options: [
        { value: null, text: 'Selecione uma opção' },
        { value: 'E', text: 'Entrada' },
        { value: 'S', text: 'Saída' },
      ],
      formData: {
        amount: 0, 
        type: 'E' 
      },
      isLoading: false
    }
  },    
  props: {
    id: {
      required: true
    }
  },
  methods: {
    validateAmount() {
      if (
        this.formData.type === 'S' &&
        this.formData.amount > this.$store.state.inventories.amount || this.formData.amount === 0
      ) {
        let message = "Não há estoque disponível para retirar a quantidade solicitada"

        if (this.formData.amount === 0) {
          message = "Quantidade deve ser maior que zero"
        }

        this.$bvToast.toast(message, {
          title: 'Erro',
          autoHideDelay: 5000,
        })

        return false
      }
      return true
    },
    async onSubmit() {
      if (this.validateAmount()) {
        try {
          this.isLoading = true
          await this.$store.dispatch('storeInventory', { ...this.formData, product_id: this.id })
          this.$router.push({name: 'admin.products'})
        } catch (error) {
          const {message} = error
          this.$bvToast.toast(message, {
            title: 'Erro',
            autoHideDelay: 5000,
          })
        } finally {
          this.isLoading = false
        }
      }
    }
  },
}
</script>