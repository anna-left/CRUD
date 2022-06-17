import { getPostData } from "../utils/getPostData";
import * as userModel from "../models/userModel";

import { DEFAULT_HEADERS, HTTP_STATUS_CODES, HTTP_RESPONS_MESSAGES } from '../utils/constants';
import { IUser, IUserData } from "../interfaces/interfaces";

async function getAll(request, response) {
  try {
    const users = await userModel.findAll();

    response.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS)
    response.end(JSON.stringify(users))
  } catch (error) {
    console.log(error)
  }
}

async function getByID(request, response, id: string) {
  try {
    const user = await userModel.findById(id)

    if (user) {
      response.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS)
      response.end(JSON.stringify(user))
    } else {
      response.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS)
      response.end(JSON.stringify({ message: 'User Not Found' }))
    }
  } catch (error) {
    console.log(error)
  }

}

async function create(request, response) {

  try {
    const body = await getPostData(request)
    const { username, age, hobbies } = JSON.parse(body);
    const user = { username, age, hobbies };
    const newUser = await userModel.create(user)

    response.writeHead(201, DEFAULT_HEADERS)
    return response.end(JSON.stringify(newUser))

  } catch (error) {
    console.log(error)
  }

}


async function update(request, response, id: string) {
  try {
    const user: IUserData = await userModel.findById(id) as IUserData;

    if (user) {
      const body = await getPostData(request)
      const { username, age, hobbies } = JSON.parse(body)
      const userData = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies
      }

      const updUser = await userModel.update(id, userData)

      response.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS)
      return response.end(JSON.stringify(updUser))
    } else {
      response.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS)
      response.end(JSON.stringify({ message: 'User Not Found' }))
    }

  } catch (error) {
    console.log(error)
  }
}

async function remove(request, response, id: string) {

  try {
    const user = await userModel.findById(id)

    if (user) {
      await userModel.remove(id)
      response.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS)
      response.end(JSON.stringify({ message: `User ${id} removed` }))
    } else {
      response.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS)
      response.end(JSON.stringify({ message: 'User Not Found' }))
    }
  } catch (error) {
    console.log(error)
  }

}

export { getAll, getByID, update, create, remove };