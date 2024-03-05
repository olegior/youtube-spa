import axios from "axios";

const url = import.meta.env.VITE_YT_BASEURL;
const key = import.meta.env.VITE_YT_TOKEN;

export const api = axios.create({
    baseURL: url,
});

api.interceptors.request.use((request) => {
    request.url += `&key=${key}`;
    return request;
});

api.interceptors.response.use((response) => {
    if (response.status === 200)
        return response.data;
    return response.data;
});