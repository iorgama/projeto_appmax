import Vue from "vue";
import Vuex from "vuex";

import Products from "./modules/products/products";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        products: Products
    }
});

export default store;
