import { getJwt } from "./authService";
import http from "./http";
import config from "../config.json";

http.setJwt(getJwt());

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1);
}

function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0);
}

export async function getEnterExit(company) {
  return await http.post(config.apiEndpoint + "/EnterExit/company", {
    company,
  });
}

export async function getEnterExitByTime(start, end, company) {
  return await http.post(config.apiEndpoint + "/EnterExit/" + company, {
    start,
    end,
  });
}

export async function getEnterExitMonth(company) {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return await http.post(config.apiEndpoint + "/EnterExit/" + company, {
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
}
