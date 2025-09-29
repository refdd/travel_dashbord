import axios from "axios";
import config from "./config";

const axiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  withCredentials: true,
  // validateStatus: function (status) {
  //   return (status >= 200 && status < 300) || status === 401;
  // },
});

export default axiosInstance;
