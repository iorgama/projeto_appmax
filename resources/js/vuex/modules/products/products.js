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
                        "Não foi possível carregar produtos agora. Tente novamente em alguns instantes."
                };
            }
        },

        async storeProduct(context, params) {
            try {
                await httpService.post("/adicionar-produto", params);
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
        },

        async updateProduct(context, { id, ...params }) {
            try {
                await httpService.put(`/atualizar-produto/${id}`, params);
            } catch (error) {
                const {
                    data: { message }
                } = error.response;

                if (message) {
                    throw { message };
                }

                throw {
                    message:
                        "Não foi possível editar o produto agora. Tente novamente em alguns instantes."
                };
            }
        },

        async deleteProduct(context, { id }) {
            try {
                await httpService.delete(`/remover-produto/${id}`);
            } catch (error) {
                const {
                    data: { message }
                } = error.response;

                if (message) {
                    throw { message };
                }

                throw {
                    message:
                        "Não foi possível remover o produto agora. Tente novamente em alguns instantes."
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
