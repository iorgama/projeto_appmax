<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">Appmax</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link :to="{name: 'admin.products'}" custom v-slot="{ href, navigate, isActive }">
            <b-nav-item :href="href" @click="navigate" :active="isActive">Produtos</b-nav-item>
          </router-link>
          <router-link :to="{name: 'admin.report'}" custom v-slot="{ href, navigate, isActive }">
            <b-nav-item :href="href" @click="navigate" :active="isActive">Relatórios</b-nav-item>
          </router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="isLoading">
            <b-spinner small label="Spinning" variant="light" />
          </b-nav-item>
          <b-nav-item-dropdown right v-if="user">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{user.name}}</em>
            </template>
            <b-dropdown-item href="#" @click="logout">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      required: true,
    },
    logout: {
      required: true,
    },
    user: {
      required: true,
    },
  },
}
</script>
