import Vue from "vue";
import Vuex from "vuex";

import products from "./modules/products/products";
import inventories from "./modules/inventories/inventories";
import auth from "./modules/auth/auth";
import reports from "./modules/reports/reports";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        products,
        inventories,
        reports,
        auth
    }
});

export default store;
