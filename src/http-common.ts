import axios from "axios";

export default axios.create({
  baseURL: "https://wokky-api.pnatu.dev",
  headers: {
    "Content-type": "application/json",
  },
});
