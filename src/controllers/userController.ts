import { getPostData } from "../utils/getPostData";
import * as userModel from "../models/userModel";
import {
  DEFAULT_HEADERS,
  HTTP_STATUS_CODES,
  HTTP_RESPONS_MESSAGES,
} from "../utils/constants";
import { IUser, IUserData } from "../interfaces/interfaces";
import { IncomingMessage, ServerResponse } from "http";
import { uuidValidate } from "../utils/uuidValidate";

async function getAll(_: IncomingMessage, response: ServerResponse) {
  try {
    const users = await userModel.findAll();

    response.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS);
    response.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

async function getByID(
  _: IncomingMessage,
  response: ServerResponse,
  id: string
) {
  try {
    if (!uuidValidate(id)) {
      response.writeHead(HTTP_STATUS_CODES.BAD_REQUEST, DEFAULT_HEADERS);
      response.end(HTTP_RESPONS_MESSAGES.INVALID_UUID_FORMAT);
    }
    const user = await userModel.findById(id);

    if (user) {
      response.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS);
      response.end(JSON.stringify(user));
    } else {
      response.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
      response.end(HTTP_RESPONS_MESSAGES.USER_NOT_FOUND);
    }
  } catch (error) {
    console.log(error);
  }
}

async function create(request: IncomingMessage, response: ServerResponse) {
  try {
    const body = await getPostData(request);

    try {
      var userData: IUserData = JSON.parse(body as string);
      if (!userData.username || !userData.age || !userData.hobbies) {
        response.writeHead(HTTP_STATUS_CODES.BAD_REQUEST, DEFAULT_HEADERS);
        return response.end(
          HTTP_RESPONS_MESSAGES.REQUIRED_FIELDS_ARE_NOT_FILLED
        );
      }
      if (
        typeof userData.username !== "string" ||
        typeof userData.age !== "number" ||
        !Array.isArray(userData.hobbies) ||
        Object.keys(userData).length !== 3
      ) {
        response.writeHead(HTTP_STATUS_CODES.BAD_REQUEST, DEFAULT_HEADERS);
        return response.end(HTTP_RESPONS_MESSAGES.INCORRECT_FIELDS);
      }
    } catch (error) {
      response.writeHead(HTTP_STATUS_CODES.BAD_REQUEST, DEFAULT_HEADERS);
      return response.end(HTTP_RESPONS_MESSAGES.INCORRECT_FIELDS);
    }

    const newUser = await userModel.create(userData);

    response.writeHead(
      HTTP_STATUS_CODES.REQUEST_WAS_SUCCESSFUL,
      DEFAULT_HEADERS
    );
    return response.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

async function update(
  request: IncomingMessage,
  response: ServerResponse,
  id: string
) {
  try {
    if (!uuidValidate(id)) {
      response.writeHead(HTTP_STATUS_CODES.BAD_REQUEST, DEFAULT_HEADERS);
      return response.end(HTTP_RESPONS_MESSAGES.INVALID_UUID_FORMAT);
    }
    const user: IUser = (await userModel.findById(id)) as IUser;

    if (user) {
      try {
        const body = await getPostData(request);
        const userUpd = JSON.parse(body as string);

        for (var prop in userUpd) {
          if (prop === "username" && typeof userUpd[prop] === "string") {
          } else if (prop === "age" && typeof userUpd[prop] === "number") {
          } else if (prop === "hobbies" && Array.isArray(userUpd[prop])) {
          } else if (prop === "id" && userUpd[prop] === user.id) {
          } else {
            response.writeHead(HTTP_STATUS_CODES.BAD_REQUEST, DEFAULT_HEADERS);
            return response.end(HTTP_RESPONS_MESSAGES.INCORRECT_FIELDS);
          }
        }
        const userData = {
          username: userUpd.username || user.username,
          age: userUpd.age || user.age,
          hobbies: userUpd.hobbies || user.hobbies,
        };
        const updatedUser = await userModel.update(id, userData);

        response.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS);
        return response.end(JSON.stringify(updatedUser));
      } catch (error) {
        response.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
        return response.end(HTTP_RESPONS_MESSAGES.INCORRECT_FIELDS);
      }
    } else {
      response.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
      return response.end(HTTP_RESPONS_MESSAGES.USER_NOT_FOUND);
    }
  } catch (error) {
    console.log(error);
  }
}

async function remove(
  request: IncomingMessage,
  response: ServerResponse,
  id: string
) {
  try {
    if (!uuidValidate(id)) {
      response.writeHead(HTTP_STATUS_CODES.BAD_REQUEST, DEFAULT_HEADERS);
      return response.end(HTTP_RESPONS_MESSAGES.INVALID_UUID_FORMAT);
    }
    const user = await userModel.findById(id);

    if (user) {
      await userModel.remove(id);
      response.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS);
      return response.end(JSON.stringify({ message: `User ${id} removed` }));
    } else {
      response.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
      return response.end(HTTP_RESPONS_MESSAGES.USER_NOT_FOUND);
    }
  } catch (error) {
    console.log(error);
  }
}

export { getAll, getByID, update, create, remove };
