<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="fdescription-group"
        label="Descrição"
        label-for="fdescription"
      >
        <b-form-input
          id="fdescription"
          v-model="formData.description"
          type="text"
          placeholder="Insira a descrição do produto, por exemplo, Smartphone"
          required
        />
      </b-form-group>

      <b-form-group
        id="fbrand-group"
        label="Marca"
        label-for="fbrand"
      >
        <b-form-input
          id="fbrand"
          v-model="formData.brand"
          type="text"
          placeholder="Insira a marca do produto, por exemplo, Samsung"
          required
        />
      </b-form-group>

      <b-form-group
        id="fmodel-group"
        label="Modelo"
        label-for="fmodel"
      >
        <b-form-input
          id="fmodel"
          v-model="formData.model"
          type="text"
          placeholder="Insira o modelo do produto, por exemplo, Galaxy S20"
          required
        />
      </b-form-group>

      <b-form-group
        id="fcolor-group"
        label="Cor"
        label-for="fcolor"
      >
        <b-form-input
          id="fcolor"
          v-model="formData.color"
          type="text"
          placeholder="Insira a cor do produto"
          required
        />
      </b-form-group>

      <b-form-group
        id="fsku-group"
        label="SKU"
        label-for="fsku"
      >
        <b-form-input
          id="fsku"
          :value="sku"
          type="text"
          readonly
        />
        <small>
          A SKU é gerada a partir dos três primeiros caracteres da descrição do produto mais o primeiro caractere do fabricante mais os dois primeiros caracteres do modelo e por último os dois primeiros caracteres da cor.
        </small>
      </b-form-group>

      <div class="mt-4">
        <b-button type="submit" block variant="primary" :disabled="isLoading">
          {{isLoading ? 'Salvando produto...' : 'Salvar'}}
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    }
  },
  created() {
    if (this.product) {
      this.formData = {
        ...this.formData,
        description: this.product.description,
        brand: this.product.brand,
        model: this.product.model,
        color: this.product.color,
      }
    }
  },
  computed: {
    //Dynamically compute the sku.
    product() {
      if (this.id) {
        return this.$store.getters.getProductById(this.id);
      }
    },
    sku() {
      const description = this.formData.description.substring(0,3);
      const brand = this.formData.brand.substring(0, 1);
      const model = this.formData.model.substring(0, 2);
      const color = this.formData.color.substring(0, 2);
      return [description, brand, model,color].join('').toUpperCase();
    }
  },
  data() {
    return {
      formData: {
        description: '',
        brand: '',
        model: '',
        color: ''
      },
      isLoading: false
    }
  },
  props: {
    id: {
      required: false
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.isLoading = true
        if (!this.id) {
          await this.$store.dispatch('storeProduct', {...this.formData, sku: this.sku})
        } else {
          await this.$store.dispatch('updateProduct', {...this.formData, sku: this.sku, id: this.id})
        }
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
  },
}
</script>