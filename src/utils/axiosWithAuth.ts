import axios from "axios";
import { AuthState } from "../authContext";

const axiosWithAuth = (details?: AuthState) =>
  axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
    headers: {
      user_details: JSON.stringify(details),
    },
    withCredentials: true,
  });

export default axiosWithAuth;
