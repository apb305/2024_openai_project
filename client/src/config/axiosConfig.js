import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.HOST_URL
      : "http://localhost:4000",
});

export default instance;
