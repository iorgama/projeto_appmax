import("./bootstrap");
import Vue from "vue";

import router from "./routes/router";
import store from "./vuex/store";

const app = new Vue({
    router,
    store,
    render: h => h(TestComponent)
}).$mount("#app");
