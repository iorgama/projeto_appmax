<template>
  <div>

    <div class="my-4">
      <router-link :to="{name: 'admin.products.create'}" custom v-slot="{ navigate }">
        <b-button @click="navigate">Cadastrar produto</b-button>
      </router-link>
    </div>

    <div class="d-flex justify-content-center" v-if="isLoading">
      <b-spinner label="Spinning" variant="primary" />
    </div>
    <b-table striped hover :fields="fields" :items="items" responsize="sm" v-else>
      <!-- A virtual column -->
      <template #cell(id)="data">
          <b-button @click="onPressEdit(data.value)" variant="success">
            <b-icon-pencil />
          </b-button>
          <b-button @click="onPressInventory(data.value)" variant="secondary">Estoque</b-button>
          <b-button @click="onPressDelete(data.value)" variant="danger">
            <b-icon-trash />
          </b-button>
      </template>
    </b-table>

    <b-overlay :show="!!productIDToDelete" no-wrap fixed>
      <template #overlay>
        <div
          ref="dialog"
          tabindex="-1"
          role="dialog"
          aria-modal="false"
          aria-labelledby="form-confirm-label"
          class="text-center p-3"
        >
          <p><strong id="form-confirm-label">Você tem certeza?</strong></p>
          <div class="d-flex">
            <b-button variant="outline-danger" class="mr-3" @click="onCancel">
              Cancelar
            </b-button>
            <b-button variant="outline-success" @click="onOK">Deletar</b-button>
          </div>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
export default {
  created() {
    this.loadProducts()
  },
  computed: {
    items() {
      return this.$store.state.products.items
    }
  },
  data() {
    return {
      productIDToDelete: null,
      fields: [
        { key: 'description', label: 'Descrição', sortable: true },
        { key: 'brand', label: 'Fabricante', sortable: true },
        { key: 'model', label: 'Modelo' },
        { key: 'color', label: 'Cor' },
        { key: 'sku', label: 'SKU' },
        { key: 'id', label: 'Ações' },
      ],
      isLoading: false,
    }
  },
  methods: {
    addToast(message) {
      this.$bvToast.toast(message, {
        title: 'Erro',
        autoHideDelay: 5000,
      })
    },
    async loadProducts() {
      try {
        this.isLoading = true
        await this.$store.dispatch('loadProducts')
      } catch (error) {
        const { message } = error
        this.addToast(message)
      } finally {
        this.isLoading = false
      }
    },
    async deleteProduct() {
      try {
        this.isLoading = true
        await this.$store.dispatch('deleteProduct', { id: this.productIDToDelete })
        await this.loadProducts()
      } catch (error) {
        const { message } = error
        this.addToast(message)
      } finally {
        this.isLoading = false
      }
    },
    onPressEdit(id) {
      this.$router.push({ name: 'admin.products.edit', params: { id } })
    },
    onPressInventory(id) {
      this.$router.push({ name: 'admin.products.inventory', params: { id }})
    },
    onPressDelete(id) {
      this.productIDToDelete = id
    },
    onCancel() {
      this.productIDToDelete = null
    },
    onOK() {
      this.deleteProduct()
      this.productIDToDelete = null
    },
  }
}
</script>

<style>

</style>