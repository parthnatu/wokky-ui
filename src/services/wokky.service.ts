import http from "../http-common";
import WokkyDTO from "../models/wokky";
import axiosRetry from "axios-retry";
axiosRetry(http, {
  retries: 3, // Number of retries (Defaults to 3)
});
const isWokky = (_latitude: number, _longitude: number) => {
  return http.post<WokkyDTO>("/wokky_time_now", {
    latitude: _latitude,
    longitude: _longitude,
  });
};

const registerNotification = (
  _latitude: number,
  _longitude: number,
  subscription: any
) => {
  console.log({
    latitude: _latitude,
    longitude: _longitude,
    subscription: subscription,
  });
  return http.post<any>("/subscribe", {
    latitude: _latitude,
    longitude: _longitude,
    subscription: subscription,
  });
};

const WokkyService = {
  isWokky,
  registerNotification,
};
export default WokkyService;
