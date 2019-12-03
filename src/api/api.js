import axios from "axios";

import headerInterceptors from "./interceptors/header.interceptors";
import unauthorizedInterceptors from "./interceptors/unauthorized.interceptors";

const api = axios.create({});

api.interceptors.response.use(headerInterceptors);

api.interceptors.response.use(
  response => response,
  async error => {
    const err = await unauthorizedInterceptors(error);
    console.log(err);
    return Promise.reject(err);
  }
);

export default api;
