import axios from "axios";
import Store from "@/store";

const api = axios.create({
  baseURL: "http://localhost:5001/",
});

axios.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const repoAdoptToken = Store?.getters?.["user/repoAdoptToken"];
      if (repoAdoptToken) {
        config.headers.common["Authorization"] = repoAdoptToken;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
