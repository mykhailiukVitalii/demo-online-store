import axios from "axios";
import { API_ENDPOINT } from "../utils/contstans";

const $host = axios.create({
    baseURL: API_ENDPOINT
})

const $authHost = axios.create({
    baseURL: API_ENDPOINT
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}