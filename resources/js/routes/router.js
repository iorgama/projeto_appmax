import Vue from "vue";
import VueRouter from "vue-router";

import store from "../vuex/store";
import ProductsComponent from "../components/admin/pages/products/ProductsComponent";
import DashboardComponent from "../components/admin/pages/dashboard/DashboardComponent";
import AdminComponent from "../components/admin/AdminComponent";
import AddProductsComponent from "../components/admin/pages/products/AddProductsComponent";
import EditAmountProductComponent from "../components/admin/pages/products/EditAmountProductComponent";

Vue.use(VueRouter);

const routes = [
    {
        path: "/admin",
        component: AdminComponent,
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
                path: "products/:id/edit-amount",
                component: EditAmountProductComponent,
                name: "admin.products.editamount",
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
                path: "",
                component: DashboardComponent,
                name: "admin.dashboard"
            }
        ]
    }
];

const router = new VueRouter({ mode: "history", routes });

export default router;
