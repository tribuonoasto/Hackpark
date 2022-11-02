const request = require("supertest");
const { Sequelize } = require("../models");
const app = require("../app");

describe("get all users", () => {
  it("get /users => success test status(200)", async () => {
    const result = await request(app).get("/users/");
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("id", expect.any(Number));
    expect(result.body).toHaveProperty("username", expect.any(String));
    expect(result.body).toHaveProperty("email", expect.any(String));
  });
});

describe("get user by id", () => {
  it("get /users/:id => success test status(200)", async () => {
    const id = 1;
    const result = await request(app).get(`/users/${id}`);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("id", expect.any(Number));
    expect(result.body).toHaveProperty("username", expect.any(String));
    expect(result.body).toHaveProperty("email", expect.any(String));
  });
});

describe("get user by id", () => {
  it("get /users/:id => fail test status(404)", async () => {
    const id = 999;
    const result = await request(app).get(`/users/${id}`);
    expect(result.status).toBe(404);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(Number));
  });
});

describe("delete user by id", () => {
  it("delete /users/:id => success test status(200)", async () => {
    const id = 1;
    const result = await request(app).delete(`/users/${id}`);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
  });
});

describe("patch user by id", () => {
  it("patch /users/:id => success test status(201)", async () => {
    const id = 1;
    const payload = { username: "patch username" };
    const result = await request(app).patch(`/users/${id}`).send(payload);
    expect(result.status).toBe(201);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
  });
});
