import { createServer, RequestListener, Server } from "http";
import "dotenv/config";

import { router } from "./router";
import {
  DEFAULT_HEADERS,
  HTTP_RESPONS_MESSAGES,
  HTTP_STATUS_CODES,
} from "./utils/constants";
import { IUser } from "./interfaces/interfaces";

const usersDB: IUser[] = [];

export const server: Server = createServer(function (request, response) {
  try {
    router(request, response);
  } catch (err) {
    response.writeHead(
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      DEFAULT_HEADERS
    );
    response.end(HTTP_RESPONS_MESSAGES.INTERNAL_SERVER_ERROR);
  }
});

export { usersDB };
