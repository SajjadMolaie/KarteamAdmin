import { getJwt } from "./authService";
import http from "./http";
import config from "../config.json";

http.setJwt(getJwt());

export async function getUser(companyId) {
  const { data: users } = await http.get(
    config.apiEndpoint + "/companyUser/company/" + String(companyId)
  );

  return users;
}

export async function findAllUsers() {
  return await http.get(config.apiEndpoint + "/user");
}

export async function findUserById(id) {
  return await http.get(config.apiEndpoint + "/user/" + id);
}
