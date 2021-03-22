import httpService from "../../../services/httpService";

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
            httpService
                .get("/produtos")
                .then(response => {
                    context.commit("SET_PRODUCTS", response.data);
                })
                .catch(errors => {
                    console.log(errors);
                });
        },

        storeProduct(context, params) {
            return new Promise((resolve, reject) => {
                httpService
                    .post("/adicionar-produtos", params)
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
