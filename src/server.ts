import { createServer, RequestListener, Server } from "http";
import "dotenv/config";

import { router } from "./router";
import {
  DEFAULT_HEADERS,
  HTTP_RESPONS_MESSAGES,
  HTTP_STATUS_CODES,
} from "./utils/constants";
import { IUser } from "./interfaces/interfaces";

const usersDB: IUser[] = [
  {
    id: "ba64be9b-9d38-4261-b42f-db4d813e99a9",
    username: "anonymous",
    age: 25,
    hobbies: ["reading", "travels"],
  },
];

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
