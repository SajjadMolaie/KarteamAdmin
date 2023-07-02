import { getJwt } from "./authService";
import http from "./http";
import config from "../config.json";

http.setJwt(getJwt());

export async function getCompany() {
  const { data: company } = await http.get(config.apiEndpoint + "/companyUser");

  return company;
}
