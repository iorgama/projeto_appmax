import Vue from "vue";
import Vuex from "vuex";

import products from "./modules/products/products";
import auth from "./modules/auth/auth";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        products,
        auth
    }
});

export default store;
