import axios from "axios";

const axiosWithAuth = () =>
  axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true,
  });

export default axiosWithAuth;
