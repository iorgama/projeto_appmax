import("./bootstrap");
import Vue from "vue";

import router from "./routes/router";
import store from "./vuex/store";
import AppComponent from "./components/admin/AdminComponent";

Vue.component("admin-component", AppComponent);

const app = new Vue({
    router,
    store
}).$mount("#app");
