import axios from "axios";
import Store from "@/store";
import Config from "@/config.loader";

// const url = process.env.VUE_APP_AXIOS;
const url = Config("VUE_APP_GRAPHQL");

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
