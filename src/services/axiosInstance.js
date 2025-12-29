import axios from "axios";

const apiKey = import.meta.env.APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiKey,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
