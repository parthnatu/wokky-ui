import http from "../http-common";
import WokkyDTO from "../models/wokky";

const isWokky = (_latitude: number, _longitude: number) => {
  return http.post<WokkyDTO>("/wokky_time_now", {latitude : _latitude, longitude: _longitude});
};
const WokkyService = {
  isWokky,
};
export default WokkyService;
