import Vue from "vue";
import VueRouter from "vue-router";

import store from "../vuex/store";

import ProductsComponent from "../components/admin/pages/products/ProductsComponent";
import ReportComponent from "../components/admin/pages/reports/ReportComponent";
import AdminComponent from "../components/admin/AdminComponent";
import AddProductsComponent from "../components/admin/pages/products/AddProductsComponent";
import InventoryProductComponent from "../components/admin/pages/inventories/InventoryProductComponent";
import LoginComponent from "../components/admin/pages/login/LoginComponent";
import NotFoundPageComponent from "../components/admin/pages/404/NotFoundPageComponent";

import { TokenStorage } from "../services/tokenStorage";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: AdminComponent,
        meta: { auth: true },
        name: "home",
        children: [
            {
                path: "products",
                component: ProductsComponent,
                name: "admin.products"
            },
            {
                path: "products/create",
                component: AddProductsComponent,
                name: "admin.products.create"
            },
            {
                path: "products/:id/edit",
                component: AddProductsComponent,
                name: "admin.products.edit",
                props: true
            },
            {
                path: "products/:id/inventory",
                component: InventoryProductComponent,
                name: "admin.products.inventory",
                props: true,
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
                path: "reports",
                component: ReportComponent,
                name: "admin.report"
            }
        ]
    },
    {
        path: "/login",
        component: LoginComponent,
        name: "login"
    },
    //Error 404
    { path: "*", component: NotFoundPageComponent }
];

const router = new VueRouter({ mode: "history", routes });

router.beforeEach((to, from, next) => {
    // Check if any routes in the history requires auth
    if (to.matched.some(record => record.meta.auth)) {
        const token = TokenStorage.getToken();
        if (token) {
            next();
            return;
        }
        store.commit("CHANGE_URL_BACK", to.name);
        next("/login");
    } else {
        next();
    }
});

export default router;
