import axios from "axios";

export default axios.create({
  // baseURL: 'http://127.0.0.1:7001',
  timeout: 6 * 1000,
  headers: { "x-auth-app": "rankit" }
  // withCredentials: true
});
