import { getPostData } from "../utils/getPostData";
import * as userModel from "../models/userModel";
import {
  DEFAULT_HEADERS,
  HTTP_STATUS_CODES,
  HTTP_RESPONS_MESSAGES,
} from "../utils/constants";
import { IUserData } from "../interfaces/interfaces";
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
    const { username, age, hobbies } = JSON.parse(body as string);
    const user = { username, age, hobbies };
    const newUser = await userModel.create(user);

    response.writeHead(201, DEFAULT_HEADERS);
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
    const user: IUserData = (await userModel.findById(id)) as IUserData;

    if (user) {
      const body = await getPostData(request);
      const { username, age, hobbies } = JSON.parse(body as string);
      const userData = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      const updatedUser = await userModel.update(id, userData);

      response.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS);
      return response.end(JSON.stringify(updatedUser));
    } else {
      response.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
      response.end(HTTP_RESPONS_MESSAGES.USER_NOT_FOUND);
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
    const user = await userModel.findById(id);

    if (user) {
      await userModel.remove(id);
      response.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS);
      response.end(JSON.stringify({ message: `User ${id} removed` }));
    } else {
      response.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
      response.end(HTTP_RESPONS_MESSAGES.USER_NOT_FOUND);
    }
  } catch (error) {
    console.log(error);
  }
}

export { getAll, getByID, update, create, remove };
