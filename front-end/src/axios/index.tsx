import axios from "axios";

const request = axios.create({
  baseURL: "http://54.255.226.203:5001/api/v1/",
  headers: { "Content-Type": "application/json" },
});

export default request;
