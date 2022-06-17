import { ServerResponse } from "http";
import { Readable } from "stream";
import * as userController from "./controllers/userController";

import {
  DEFAULT_HEADERS,
  HTTP_STATUS_CODES,
  HTTP_RESPONS_MESSAGES,
} from "./utils/constants";

function router(request, response: ServerResponse) {
  if (request.url === "/api/users" && request.method === "GET") {
    userController.getAll(request, response);
  } else if (
    request.url.match(/\/api\/users\/\w+/) &&
    request.method === "GET"
  ) {
    const id = request.url.split("/")[3];
    userController.getByID(request, response, id);
  } else if (request.url === "/api/users" && request.method === "POST") {
    userController.create(request, response);
  } else if (
    request.url.match(/\/api\/users\/\w+/) &&
    request.method === "PUT"
  ) {
    const id = request.url.split("/")[3];
    userController.update(request, response, id);
  } else if (
    request.url.match(/\/api\/users\/\w+/) &&
    request.method === "DELETE"
  ) {
    const id = request.url.split("/")[3];
    userController.remove(request, response, id);
  } else {
    response.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
    response.end(JSON.stringify({ message: "Route Not Found" }));
  }
}

export { router };
