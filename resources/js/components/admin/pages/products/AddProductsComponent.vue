<template>
  <div>
    <div class="my-4">
      <h2>
        {{ !!id ? "Editar produto" : "Adicionar novo produto"}}
      </h2>
    </div>
    <form-product :id="id" />
  </div>
</template>

<script>
import FormAddProductsComponent from './forms/FormAddProductsComponent'
export default {
  components: {
    FormProduct : FormAddProductsComponent
  },
  props: {
    id: {
      required: false,
    }
  }
}
</script>