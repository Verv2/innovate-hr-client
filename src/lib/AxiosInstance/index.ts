import envConfig from "@/config/envConfig";
import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});

console.log("base api", envConfig.baseApi);

axiosInstance.interceptors.request.use(
  async function (config) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
