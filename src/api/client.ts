import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from "axios";

const baseURL = process.env.REACT_APP_BASE_URL_API;
console.log("API Client initialized with baseURL:", baseURL);

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const url = config.baseURL && config.url ? `${config.baseURL}${config.url}` : config.url || "unknown";
  console.log("API Request:", config.method?.toUpperCase(), url);
  const token = localStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("API Response:", response.config.url, response.status, response.data);
    return response;
  },
  (error: AxiosError) => {
    console.error("API Error:", error.config?.url, error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default api;
