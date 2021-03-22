import axios from "axios";

export default {
    state: {
        items: []
    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.items = products;
        }
    },
    actions: {
        loadProducts(context) {
            axios
                .get("/api/produtos")
                .then(response => {
                    console.log(response);
                    context.commit("SET_PRODUCTS", response.data);
                })
                .catch(errors => {
                    console.log(errors);
                });
        },

        storeProduct(context, params) {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/adicionar-produtos", params)
                    .then(response => {
                        resolve();
                    })
                    .catch(errors => {
                        reject(errors);
                    });
            });
        },

        editAmountProduct(context, params) {
            const { amount } = params;
            return new Promise((resolve, reject) => {
                axios
                    .put(`/api/baixar-produtos/${params.id}`, { amount })
                    .then(response => {
                        resolve();
                    })
                    .catch(errors => {
                        reject(errors);
                    });
            });
        }
    },
    getters: {
        getProductById: state => id => {
            return state.items.find(item => item.id === id);
        }
    }
};
