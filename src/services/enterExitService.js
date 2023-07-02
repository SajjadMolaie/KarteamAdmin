import { getJwt } from "./authService";
import http from "./http";
import config from "../config.json";

http.setJwt(getJwt());

export function getEnterExit(company) {
  const date = Date.now();
  return http.post(config.apiEndpoint + "/EnterExit/all-date", {
    company: company,
    date,
  });
}
