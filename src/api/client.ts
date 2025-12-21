import axios, { type InternalAxiosRequestConfig, type AxiosError } from "axios";

const baseURL = process.env.REACT_APP_BASE_URL_API;

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(error)
);

export default api;
