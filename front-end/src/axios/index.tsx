import axios from "axios";

const request = axios.create({
  baseURL: " https://53e5-54-179-124-120.ngrok-free.app/api/v1/",
  headers: { "Content-Type": "application/json" },
});

export default request;
