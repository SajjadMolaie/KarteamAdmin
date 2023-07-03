import { getJwt } from "./authService";
import http from "./http";
import config from "../config.json";

http.setJwt(getJwt());

export function getEnterExit(company) {
  return http.post(config.apiEndpoint + "/EnterExit/company", { company });
}

export async function getEnterExitByTime(start, end, company) {
  return http.post(config.apiEndpoint + "/EnterExit/" + company, {
    start,
    end,
  });
}
