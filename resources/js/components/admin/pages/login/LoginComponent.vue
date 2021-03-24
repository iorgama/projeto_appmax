<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-card style="flex: 1; max-width: 30rem" title="Login" class="mt-5">
        <form @submit.prevent="login">
          <label for="femail">Email:</label>
          <b-form-input
            id="femail"
            required
            type="text"
            v-model="formData.email"
          />

          <label for="fpassword">Senha:</label>
          <b-form-input
            id="fpassword"
            required
            type="password"
            v-model="formData.password"
          />

          <div class="mt-4">
            <b-button type="submit" block variant="primary" :disabled="isLoading">
              {{isLoading ? 'Efetuando login...' : 'Efetuar login'}}
            </b-button>
          </div>
        </form>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import { TokenStorage } from '../../../../services/tokenStorage';
export default {
  created() {
    const token = TokenStorage.getToken();
    if (token) {
      this.$router.push({ name: "home" })
    }
  },
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    async login() {
      try {
        this.isLoading = true
        await this.$store.dispatch("login", this.formData)
        this.$router.push({name: 'home'})
      } catch (error) {
        const { message } = error
        this.$bvToast.toast(message, {
          title: 'Erro',
          autoHideDelay: 5000,
        })
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>