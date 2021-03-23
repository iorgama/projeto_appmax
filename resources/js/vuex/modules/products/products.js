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
        async loadProducts(context) {
            try {
                const response = await httpService.get("/produtos");
                context.commit("SET_PRODUCTS", response.data);
            } catch (error) {
                const {
                    data: { message }
                } = error.response;

                if (message) {
                    throw { message };
                }

                throw {
                    message:
                        "Não foi possível fazer login agora. Tente novamente em alguns instantes."
                };
            }
        },

        async storeProduct(context, params) {
            try {
                await httpService.post("/adicionar-produtos", params);
            } catch (error) {
                const {
                    data: { message }
                } = error.response;

                if (message) {
                    throw { message };
                }

                throw {
                    message:
                        "Não foi possível cadastrar o produto agora. Tente novamente em alguns instantes."
                };
            }
        }
    },
    getters: {
        getProductById: state => id => {
            return state.items.find(item => item.id === id);
        }
    }
};
