import { getJwt } from "./authService";
import http from "./http";
import config from "../config.json";

http.setJwt(getJwt());

export async function getLocations(company) {
  return await http.get(
    config.apiEndpoint + "/companyLocation/company/" + company
  );
}

export async function addLocation(name, company, lat, long, radius) {
  return await http.post(config.apiEndpoint + "/companyLocation", {
    name,
    company,
    long,
    lat,
    radius,
  });
}

export async function deleteLocation(id) {
  return await http.delete(config.apiEndpoint + "/companyLocation/" + id);
}
