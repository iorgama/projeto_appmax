import { NAME_TOKEN } from "../config";

const TokenStorage = {
    getToken() {
        return localStorage.getItem(NAME_TOKEN);
    },
    getTokenType() {
        return "Bearer";
    },
    setToken(token) {
        localStorage.setItem(NAME_TOKEN, token);
    },
    removeToken() {
        localStorage.removeItem(NAME_TOKEN);
    }
};

export { TokenStorage };
