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
        storeInventory(context, params) {
            return new Promise((resolve, reject) => {
                httpService
                    .post("/movimentacao-estoque", params)
                    .then(response => {
                        resolve();
                    })
                    .catch(errors => {
                        reject(errors);
                    });
            });
        },
        amountProduct(context, params) {
            return new Promise((resolve, reject) => {
                httpService
                    .get(`/verifica-quantidade-estoque/${params.id}`)
                    .then(response => {
                        context.commit(
                            "SET_AMOUNT_PRODUCT",
                            response.data.amount
                        );
                    })
                    .catch(errors => {
                        console.log(errors);
                    });
            });
        }
    },
    getters: {}
};
