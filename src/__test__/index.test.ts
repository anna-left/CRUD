import request from "supertest";
import { server } from "../server";
import { v4 as uuidv4 } from "uuid";

import { HTTP_STATUS_CODES } from "../utils/constants";

describe("Scenario #1", () => {
  let id: string;
  
  const testUser = {
    username: "Arkadii Dobkin",
    age: 64,
    hobbies: ["skiing, tennis"],
  };

  it("Should return empty array", async () => {
    const res = await request(server).get("/api/users");

    expect(res.statusCode).toBe(HTTP_STATUS_CODES.OK);
    expect(res.header["content-type"]).toEqual("application/json");
    expect(res.body).toEqual([]);
  });

  it("Should create a new user", async () => {
    const response = await request(server).post("/api/users").send(testUser);

    id = response.body.id;

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.REQUEST_WAS_SUCCESSFUL);
    expect(response.header["content-type"]).toEqual("application/json");
    expect(response.body.username).toBe(testUser.username);
  });

  it("Should return user by specified id", async () => {
    const response = await request(server).get(`/api/users/${id}`);

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.OK);
    expect(response.header["content-type"]).toEqual("application/json");
    expect(response.body.username).toBe(testUser.username);
  });

  it("Should return user with updated age", async () => {
    const response = await request(server)
      .put(`/api/users/${id}`)
      .send({ age: 30 });

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.OK);
    expect(response.header["content-type"]).toEqual("application/json");
    expect(response.body.age).toBe(30);
  });

  it("Should delete user by specified id", async () => {
    const response = await request(server).delete(`/api/users/${id}`);

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.NO_CONTENT);
  });

  it("Should return message that user is not found", async () => {
    const response = await request(server).get(`/api/users/${id}`);

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND);
    expect(response.header["content-type"]).toEqual("application/json");
    expect(response.body.message).toBe("User not found");
  });
});

describe("Scenario #2", () => {
  
  let id = "";

  const testUser = {
    username: "Elon Musk",
    age: 50,
    hobbies: ["baking cookies"],
  };

  it("Should create new user and return it", async () => {
    const response = await request(server).post("/api/users").send(testUser);

    id = response.body.id;

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.REQUEST_WAS_SUCCESSFUL);
    expect(response.header["content-type"]).toEqual("application/json");
    expect(response.body.username).toBe(testUser.username);
    expect(response.body.age).toBe(testUser.age);
    expect(response.body.hobbies).toEqual(testUser.hobbies);
  });

  it("Should return message that user with specified id not found (unsuccessful search)", async () => {
    const newID: string = uuidv4();
    const response = await request(server).get(`/api/users/${newID}`);

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND);
    expect(response.header["content-type"]).toEqual("application/json");
    expect(response.body.message).toBe("User not found");
  });

  it("Should return message that user with specified id not found (unsuccessful update)", async () => {
    const newID: string = uuidv4();
    const response = await request(server)
      .put(`/api/users/${newID}`)
      .send({ age: 30 });

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND);
    expect(response.header["content-type"]).toEqual("application/json");
    expect(response.body.message).toBe("User not found");
  });

  it("Should return message that user with specified id not found (unsuccessful delete)", async () => {
    const newID: string = uuidv4();
    const response = await request(server).delete(`/api/users/${newID}`);

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND);
    expect(response.header["content-type"]).toEqual("application/json");
    expect(response.body.message).toBe("User not found");
  });

  it("Should delete user by specified id", async () => {
    const response = await request(server).delete(`/api/users/${id}`);

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.NO_CONTENT);
  });
});

describe("Scenario №#3", () => {
  
  let id = "";

  const testUser = {
    username: "Bill Gates",
    age: 67,
    hobbies: ["bridge, tennis"],
  };

  it("Should create new user and return it", async () => {
    const response = await request(server).post("/api/users").send(testUser);

    id = response.body.id;

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.REQUEST_WAS_SUCCESSFUL);
    expect(response.header["content-type"]).toEqual("application/json");
    expect(response.body.username).toBe(testUser.username);
    expect(response.body.age).toBe(testUser.age);
    expect(response.body.hobbies).toEqual(testUser.hobbies);
  });

  it("Should return message about wrong format of id", async () => {
    const response = await request(server).get("/api/users/123-456-789");

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
    expect(response.header["content-type"]).toEqual("application/json");
    expect(response.body.message).toBe("Invalid uuid format");
  });

  it("Should return array with one object", async () => {
    const response = await request(server).get("/api/users");

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.OK);
    expect(response.header["content-type"]).toEqual("application/json");
    expect(response.body.length).toBe(1);
  });

  it("Should delete user by specified id", async () => {
    const response = await request(server).delete(`/api/users/${id}`);

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.NO_CONTENT);
  });

  it("Should return empty array after deletion of user", async () => {
    const response = await request(server).get("/api/users");

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.OK);
    expect(response.header["content-type"]).toEqual("application/json");
    expect(response.body).toEqual([]);
  });
});