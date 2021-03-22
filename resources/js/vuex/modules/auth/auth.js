import httpService from "../../../services/httpService";
import { TokenStorage } from "../../../services/tokenStorage";

export default {
    state: {
        me: {},
        authenticated: false,
        urlBack: "home"
    },
    mutations: {
        AUTH_USER_OK(state, user) {
            state.authenticated = true;
            state.me = user;
        },

        LOGOUT(state) {
            // remove the user from store
            state.authenticated = false;
            state.me = {};
            // remove the token from local storage
            TokenStorage.removeToken();
        },

        CHANGE_URL_BACK(state, url) {
            state.urlBack = url;
        }
    },
    actions: {
        async login(context, params) {
            try {
                const response = await httpService.post("/login", params);
                const { token, user } = response.data;
                context.commit("AUTH_USER_OK", user);
                TokenStorage.setToken(token);
            } catch (error) {
                Promise.reject(error);
            }
        },

        logout(context) {
            context.commit("LOGOUT");
        },

        async checkLogin(context) {
            try {
                const token = TokenStorage.getToken();

                if (!token) {
                    return Promise.reject("Não há token no repositório");
                }

                const response = await httpService.get("/usuario");
                const { user } = response.data;

                context.commit("AUTH_USER_OK", user);
            } catch (error) {
                Promise.reject(error);
            }
        }
    }
};
