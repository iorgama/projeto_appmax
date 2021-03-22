import axios from "axios";
import { TokenStorage } from "./tokenStorage";

const httpService = axios.create({
    baseURL: "http://laravel-web-service.local/api"
});

httpService.interceptors.request.use(config => {
    const token = TokenStorage.getToken();
    if (token) {
        config.headers[
            "Authorization"
        ] = `${TokenStorage.getTokenType()} ${TokenStorage.getToken()}`;
    }
    return config;
});

export default httpService;
