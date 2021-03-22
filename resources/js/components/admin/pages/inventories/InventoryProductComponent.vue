<template>
  <div>
    <h1>Movimentação de Estoque</h1>
    <form-inventory :id="id" />
  </div>
</template>

<script>
import FormInventoryComponent from './forms/FormInventoryComponent';
export default {
  components:{
    FormInventory : FormInventoryComponent
  },
  props:{
    id: {
      require: true
    }
  },
}
</script>