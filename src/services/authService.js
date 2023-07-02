import jwtDecode from "jwt-decode";

import http from "./http";
import config from "../config.json";

http.setJwt(getJwt());

export function login(phoneNumber) {
  return http.post(config.apiEndpoint + "/auth/signIn", { phoneNumber });
}

export async function verify(phoneNumber, otp) {
  const { data } = await http.post(config.apiEndpoint + "/auth/verify", {
    phoneNumber,
    otp,
  });

  localStorage.setItem("token", data["access_token"]);
}

export function getJwt() {
  return localStorage.getItem("token");
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    return jwtDecode(token);
  } catch (ex) {
    return null;
  }
}

export function logout() {
  try {
    localStorage.removeItem("token");
  } catch (ex) {}
}
