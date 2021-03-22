<template>
  <div>
    <h2>
      Adicionar novo produto
    </h2>
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