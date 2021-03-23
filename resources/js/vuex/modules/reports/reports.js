import httpService from "../../../services/httpService";

export default {
    state: {
        items: []
    },
    mutations: {
        SET_REPORT_STOCK(state, reports) {
            state.items = reports;
        }
    },
    actions: {
        loadReportStock(context) {
            httpService
                .get("/relatorio-entrada-saida")
                .then(response => {
                    context.commit("SET_REPORT_STOCK", response.data);
                })
                .catch(errors => {
                    console.log(errors);
                });
        }
    }
};
