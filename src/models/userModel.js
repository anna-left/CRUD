import { v4 as uuidv4 } from 'uuid'

import { usersDB } from '../app.js'

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(usersDB)
  })
}

function findById(id) {
  return new Promise((resolve, _) => {
    const user = usersDB.find((user) => user.id === id)
    resolve(user)
  })
}

function create(user) {
  return new Promise((resolve, _) => {
    const newUser = { id: uuidv4(), ...user }
    usersDB.push(newUser)
    resolve(newUser)
  })
}

function update(id, user) {
  return new Promise((resolve, _) => {
    const index = usersDB.findIndex((user) => user.id === id)
    usersDB[index] = { id, ...user }
    resolve(usersDB[index]);
  })
}

function remove(id) {
  return new Promise((resolve, _) => {
    const index = usersDB.findIndex((user) => user.id === id)
    usersDB.splice(index,1);
    resolve();
  })
}

export { findAll, findById, create, update, remove }