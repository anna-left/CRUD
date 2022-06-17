# Simple CRUD API

Simple CRUD API using in-memory database underneath

## Install dependecies

Install the dependencies

    npm install

## NPM scripts

Run the application

- in development mode

  `npm run start:dev`

- in production mode

  `npm run start:prod`

Run e2e tests

    `npm test`

## REST API

Endpoints

### Get all Users

`GET /user`

- returns all persons

### Get one user

`GET /user/:id`

- returns user with specified id

### Create new user

`POST /user`

- reates new user

### Update user

`PUT /user/:id`

- updates user with specified id

### Delete user

`DELETE /user/:id`

- deletes user with specified id
