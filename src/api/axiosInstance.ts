import axios from "axios";
import queryString from "query-string";
import { getLocalStorage } from "src/utils/localStorage";

export const axiosInstance = axios.create({
  withCredentials: false,
  baseURL: process.env.BASE_API_URL || "https://cms.aibb.vn/backend/public/api",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const access_token = getLocalStorage("access_token");
    if (access_token && config && config.headers) {
      config.headers.Authorization = "Bearer " + access_token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    return Promise.reject(err.response);
  }
);

export default axiosInstance;
