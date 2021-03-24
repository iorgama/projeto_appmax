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
        async loadReportStock(context) {
            try {
                const response = await httpService.get(
                    "/relatorio-entrada-saida"
                );
                context.commit("SET_REPORT_STOCK", response.data);
            } catch (error) {
                const {
                    data: { message }
                } = error.response;

                if (message) {
                    throw { message };
                }

                throw {
                    message:
                        "Não foi possível carregar relatórios agora. Tente novamente em alguns instantes."
                };
            }
        }
    }
};
