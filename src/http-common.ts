import axios from "axios";

export default axios.create({
  baseURL: "https://192.168.0.185:5000/",
  headers: {
    "Content-type": "application/json",
  },
});
