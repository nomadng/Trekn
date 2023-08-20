import axios from "axios";

const request = axios.create({
  baseURL: "http://18.141.105.156:5001/api/v1/",
  headers: { "Content-Type": "application/json" },
});

export default request;
