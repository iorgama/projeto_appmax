<template>
  <div>
    <h2> Login </h2>
    <div>
    <form @submit.prevent="login">
      <label for="femail">Email:</label>
      <input type="text" id="femail" v-model="formData.email">

      <label for="fpassword">Senha:</label>
      <input type="text" id="fpassword" v-model="formData.password">

      <button type="submit"> Acessar </button>
    </form>
  </div>
  </div>
</template>

<script>
export default{
  data (){
    return {
      formData:{
        email: '',
        password: ''
      }
    }
  },
  methods:{
    login(){
      this.$store.dispatch("login", this.formData).then(() => this.$router.push({name: 'home'}).catch(errors => console.log(errors)));
    }
  }
}
</script>