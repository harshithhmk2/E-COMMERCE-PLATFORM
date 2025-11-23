// axiosInstance.js
import axios from "axios";

const PPI = axios.create({
  baseURL: "http://localhost:8080",
});


export default PPI;
