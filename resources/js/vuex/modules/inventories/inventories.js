import httpService from "../../../services/httpService";

export default {
    state: {
        amount: "Buscando quantidade disponível no estoque..."
    },
    mutations: {
        SET_AMOUNT_PRODUCT(state, amount) {
            state.amount = amount;
        }
    },
    actions: {
        async storeInventory(context, params) {
            try {
                const response = await httpService.post(
                    "/movimentacao-estoque",
                    params
                );
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
                        "Não foi possível alterar o estoque agora. Tente novamente em alguns instantes."
                };
            }
        },
        async amountProduct(context, params) {
            try {
                const response = await httpService.get(
                    `/verifica-quantidade-estoque/${params.id}`
                );
                context.commit("SET_AMOUNT_PRODUCT", response.data.amount);
            } catch (error) {
                const {
                    data: { message }
                } = error.response;

                if (message) {
                    throw { message };
                }

                throw {
                    message:
                        "Não foi possível buscar o estoque agora. Tente novamente em alguns instantes."
                };
            }
        }
    },
    getters: {}
};
