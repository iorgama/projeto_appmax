<template>
  <div>
    <div class="my-4">
      <h2>
        Movimentação de Estoque
      </h2>
    </div>
    <form-inventory :id="id" />
  </div>
</template>

<script>
import FormInventoryComponent from './forms/FormInventoryComponent';
export default {
  components: {
    FormInventory: FormInventoryComponent
  },
  props: {
    id: {
      required: true
    }
  },
}
</script>