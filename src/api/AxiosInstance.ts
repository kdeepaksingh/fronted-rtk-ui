import axios, { type InternalAxiosRequestConfig } from "axios";
import Environment from "../environment";

const AxiosInstance = axios.create({
  baseURL: Environment.APIURI,
});

AxiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");

  try {
    const parsedToken = token ? JSON.parse(token) : null;

    if (parsedToken) {
      config.headers.Authorization = `Bearer ${parsedToken}`;
    }

    // Optional custom header
    config.headers["X-Forwarded-For"] = "127.0.0.1";
  } catch (err) {
    console.error("Failed to parse token:", err);
  }

  return config;
});

export { AxiosInstance };
