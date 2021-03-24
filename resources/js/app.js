import Vue from "vue";
import { BIconPencil, BIconTrash, BootstrapVue } from "bootstrap-vue";

import router from "./routes/router";
import store from "./vuex/store";
import AdminComponent from "./components/admin/AdminComponent";

Vue.config.devtools = true;
Vue.use(BootstrapVue);

Vue.component("AdminComponent", AdminComponent);
Vue.component("BIconPencil", BIconPencil);
Vue.component("BIconTrash", BIconTrash);

new Vue({
    router,
    store
}).$mount("#app");
