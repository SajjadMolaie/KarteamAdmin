import { getJwt } from "./authService";
import http from "./http";
import config from "../config.json";

http.setJwt(getJwt());

export async function getCompany() {
  const { data: company } = await http.get(config.apiEndpoint + "/companyUser");

  return company;
}

export async function getMyCompany() {
  return await http.get(config.apiEndpoint + "/company");
}

export async function addCompany(name, phoneNumber) {
  return await http.post(config.apiEndpoint + "/company", {
    name,
    phoneNumber,
  });
}
