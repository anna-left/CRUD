import { v4 as uuidv4 } from "uuid";

import { usersDB } from "../server";
import { IUser, IUserData } from "../interfaces/interfaces";

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(usersDB);
  });
}

function findById(id: string) {
  return new Promise((resolve, _) => {
    const user = usersDB.find((user) => user.id === id);
    resolve(user);
  });
}

function create(user: IUserData) {
  return new Promise((resolve, _) => {
    const newID: string = uuidv4()
    const newUser: IUser = { id: newID, ...user };
    usersDB.push(newUser);
    resolve(newUser);
  });
}

function update(id:string, user: IUserData) {
  return new Promise((resolve, _) => {
    const index = usersDB.findIndex((user) => user.id === id);
    usersDB[index] = { id, ...user };
    resolve(usersDB[index]);
  });
}

function remove(id: string) {
  return new Promise<void>((resolve, _) => {
    const index = usersDB.findIndex((user) => user.id === id);
    usersDB.splice(index, 1);
    resolve();
  });
}

export { findAll, findById, create, update, remove };
