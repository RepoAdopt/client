import axios from "axios";
import Store from "@/store";

// @ts-ignore: Unreachable code error
const url = window.config.VUE_APP_AXIOS;

console.log(url);

const api = axios.create({
  baseURL: url,
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
