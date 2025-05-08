import axios from "axios";

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({ baseURL });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export default createAxiosInstance;

export const userApi = createAxiosInstance("http://localhost:8000/api/user");
export const areaApi = createAxiosInstance("http://localhost:8000/api/area");
export const roomApi = createAxiosInstance("http://localhost:8000/api/room");