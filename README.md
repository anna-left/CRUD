# Simple CRUD API

Simple CRUD API using in-memory database underneath

## Installation

  `git clone https://github.com/anna-left/CRUD.git`

  `cd crud`

  `git checkout develop`

  `npm install`

## Description

To test all functions CRUD API you need to use

  - Postman - HTTP client that tests HTTP requests;

  - Command line to run the application locally using npm scripts.

## NPM scripts

Run the application

- in development mode

  `npm run start:dev`

- in production mode

  `npm run start:prod`

- in multi mode

  `npm run start:multi`

Run e2e tests

  `npm test`

## REST API

Users are stored as objects that have following properties:

  `id — unique identifier (string, uuid) generated on server side`

  `username — user's name (string, required)`

  `age — user's age (number, required)`

  `hobbies — user's hobbies (array of strings or empty array, required)`

## Endpoints

### Get all Users

`GET /users`

- is used to get all persons

### Get one user

`GET /users/:id`

- is used to get one user with specified id

### Create new user

`POST /users`

- is used to create record about new user and store it in database

### Update user

`PUT /users/:id`

- updates only user-specified fields, other fields remain unchanged

### Delete user

`DELETE /user/:id`

- is used to delete existing user from database

## Author

Anna Rybakova(@anna-left)

https://t.me/AnnaFavor