import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

export default axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});
