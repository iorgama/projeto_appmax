import Vue from "vue";
import VueRouter from "vue-router";

import store from "../vuex/store";
import ProductsComponent from "../components/admin/pages/products/ProductsComponent";
import ReportComponent from "../components/admin/pages/reports/ReportComponent";
import AdminComponent from "../components/admin/AdminComponent";
import AddProductsComponent from "../components/admin/pages/products/AddProductsComponent";
import InventoryProductComponent from "../components/admin/pages/inventories/InventoryProductComponent";
import LoginComponent from "../components/admin/pages/login/LoginComponent";
import ReportStockComponent from "../components/admin/pages/reports/ReportStockComponent";
import NotFoundPageComponent from "../components/admin/pages/404/NotFoundPageComponent";
Vue.use(VueRouter);

const routes = [
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
                path: "products/:id/inventory",
                component: InventoryProductComponent,
                name: "admin.products.inventory",
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
                path: "reports",
                component: ReportComponent,
                name: "admin.report",
                children: [
                    {
                        path: "reportStock",
                        component: ReportStockComponent,
                        name: "admin.report.stock",
                        meta: { auth: true }
                    }
                ]
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
    if (to.meta.auth && !store.state.auth.authenticated) {
        store.commit("CHANGE_URL_BACK", to.name);
        next({ name: "login" });
    } else {
        next();
    }
});

export default router;
