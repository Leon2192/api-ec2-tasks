import axios from "axios";

const instance = axios.create({
  baseURL: "http://54.197.11.21:3000/api",
  withCredentials: true,
});

export default instance;
