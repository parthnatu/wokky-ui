export default interface WokkyDTO {
  current_relative_humidity_2m: number;
  current_temperature_2m: number;
  current_wind_gusts_10m: number;
  current_wind_speed_10m: number;
  is_wokky: number;
  reasons: string[];
  location : any;
}
