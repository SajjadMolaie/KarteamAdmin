import { getJwt } from "./authService";
import http from "./http";
import config from "../config.json";
import { findAllUsers } from "./userService";

http.setJwt(getJwt());

export async function addCompanyUser(phoneNumber, company, role) {
  const nRole = role.charAt(0).toUpperCase() + role.slice(1);
  const { data: users } = await findAllUsers();
  const user = users.filter((user) => user.phoneNumber === phoneNumber)[0];

  await http.post(config.apiEndpoint + "/companyUser", {
    user: user._id,
    company,
    role: nRole,
  });
}

export async function deleteCompanyUser(id) {
  await http.delete(config.apiEndpoint + "/companyUser/" + id);
}

export async function changeRoleCompanyUser(id, companyId, userId, role) {
  const nRole = role === "Admin" ? "Member" : "Admin";
  return await http.put(config.apiEndpoint + "/companyUser/" + id, {
    company: companyId,
    user: userId,
    role: nRole,
  });
}
