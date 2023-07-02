import { getJwt } from "./authService";
import http from "./http";
import config from "../config.json";

http.setJwt(getJwt());

export function getRequests() {
  return http.get(config.apiEndpoint + "/request");
}

export function updateRequest(request) {
  let data = {
    user: request.user["_id"],
    company: request.company["_id"],
    start: request.start,
    end: request.end,
    status: request.status,
    type: request.type,
    description: "MCI",
  };

  return http.put(config.apiEndpoint + "/request/" + request._id, data);
}
