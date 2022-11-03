const request = require("supertest");
const { Sequelize } = require("../models");
const app = require("../app");

describe("post register customer", () => {
  it("post /register => fail test status(400),no username", async () => {
    const payload = {
      email: `lordfeexz2@gmail.com`,
      password: `qwertyui`,
    };
    const result = await request(app).post("/register").send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "username is required");
  });
});

describe("post register customer", () => {
  it("post /customers/register => fail test status(400),username already use", async () => {
    const payload = {
      username: `Lord Feexz`,
      email: `lordfeexz2@gmail.com`,
      password: `qwertyui`,
    };
    const result = await request(app).post("/customers/register").send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "username is already use");
  });
});

describe("post register customer", () => {
  it("post /customers/register => fail test status(400),no email", async () => {
    const payload = {
      username: `Lord Feexz`,
      password: `qwertyui`,
    };
    const result = await request(app).post("/customers/register").send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "email is required");
  });
});

describe("post register customer", () => {
  it("post /customers/register => fail test status(400),no email format", async () => {
    const payload = {
      username: `Lord Feexz`,
      email: `lordfeexz2`,
      password: `qwertyui`,
    };
    const result = await request(app).post("/customers/register").send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "use email format!");
  });
});

describe("post register customer", () => {
  it("post /customers/register => fail test status(400),email already use", async () => {
    const payload = {
      username: `Lord Feexz`,
      email: `lordfeexz@gmail.com`,
      password: `qwertyui`,
    };
    const result = await request(app).post("/customers/register").send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "email is already use");
  });
});

describe("post register customer", () => {
  it("post /customers/register => fail test status(400),no password", async () => {
    const payload = {
      username: `Lord Feexz`,
      email: `lordfeexz2@gmail.com`,
    };
    const result = await request(app).post("/customers/register").send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "password is required");
  });
});

describe("post register customer", () => {
  it("post /customers/register => fail test status(400),password length < 5", async () => {
    const payload = {
      username: `Lord Feexz`,
      email: `lordfeexz2@gmail.com`,
      password: `qwe`,
    };
    const result = await request(app).post("/customers/register").send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty(
      "message",
      "password minimum character is 5"
    );
  });
});

describe("post register customer", () => {
  it("post /register => success test status(201)", async () => {
    const payload = {
      username: `Lord Feexz`,
      email: `lordfeexz4@gmail.com`,
      password: `qwertyui`,
    };
    const result = await request(app).post("/register").send(payload);
    expect(result.status).toBe(201);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("id", expect.any(Number));
    expect(result.body).toHaveProperty("username", expect.any(String));
    expect(result.body).toHaveProperty("email", expect.any(String));
  });
});
