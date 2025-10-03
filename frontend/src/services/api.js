import axios from "axios";

const API_BASE = "http://localhost:4000/api/auth"; // backend base URL

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// Optional: Add JWT automatically to headers if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
