<template>
  <div>
    <div class="my-4">
      <h2>
        Adicionar novo produto
      </h2>
    </div>
    <form-product />
  </div>
</template>

<script>
import FormAddProductsComponent from './forms/FormAddProductsComponent'
export default {
  components:{
    FormProduct : FormAddProductsComponent
  }
}
</script>