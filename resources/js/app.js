import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";

import "../css/app.scss";

import router from "./routes/router";
import store from "./vuex/store";
import AppComponent from "./components/admin/AdminComponent";

Vue.config.devtools = true;
Vue.use(BootstrapVue);

Vue.component("admin-component", AppComponent);

new Vue({
    router,
    store
}).$mount("#app");
