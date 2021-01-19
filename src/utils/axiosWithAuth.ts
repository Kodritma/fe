import axios from "axios";

const axiosWithAuth = () =>
  axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
    withCredentials: true,
  });

export default axiosWithAuth;
