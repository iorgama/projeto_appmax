import Vue from "vue";
import VueRouter from "vue-router";

import store from "../vuex/store";
import ProductsComponent from "../components/admin/pages/products/ProductsComponent";
import DashboardComponent from "../components/admin/pages/dashboard/DashboardComponent";
import AdminComponent from "../components/admin/AdminComponent";
import AddProductsComponent from "../components/admin/pages/products/AddProductsComponent";
import EditAmountProductComponent from "../components/admin/pages/products/EditAmountProductComponent";
import LoginComponent from "../components/admin/pages/login/LoginComponent";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        component: LoginComponent,
        name: "login"
    },
    {
        path: "/",
        component: AdminComponent,
        name: "home",
        children: [
            {
                path: "products",
                component: ProductsComponent,
                name: "admin.products",
                meta: { auth: true }
            },
            {
                path: "products/create",
                component: AddProductsComponent,
                name: "admin.products.create",
                meta: { auth: true }
            },
            {
                path: "products/:id/edit-amount",
                component: EditAmountProductComponent,
                name: "admin.products.editamount",
                props: true,
                meta: { auth: true },
                beforeEnter: (to, from, next) => {
                    const id = to.params.id;
                    if (store.getters.getProductById(id)) {
                        next();
                    } else {
                        next({ name: "admin.products" });
                    }
                }
            },
            {
                path: "dashboard",
                component: DashboardComponent,
                name: "admin.dashboard"
            }
        ]
    }
];

const router = new VueRouter({ mode: "history", routes });

router.beforeEach((to, from, next) => {
    if (to.meta.auth && !store.state.auth.authenticated) {
        store.commit("CHANGE_URL_BACK", to.name);
        next({ name: "login" });
    } else {
        next();
    }
});

export default router;
