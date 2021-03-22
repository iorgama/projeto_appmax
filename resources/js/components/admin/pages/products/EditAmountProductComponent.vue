<template>
  <div>
    <h1>Dar baixa no produto</h1>
    <form-amount :id="id" />
  </div>
</template>

<script>
import FormEditAmountProductsComponent from './forms/FormEditAmountProductsComponent';
export default {
  components:{
    FormAmount : FormEditAmountProductsComponent
  },
  props:{
    id: {
      require: true
    }
  },
}
</script>