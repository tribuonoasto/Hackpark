const request = require("supertest");
const { sequelize, User } = require("../models");
const app = require("../app");
const { createToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

const testUser = {
  username: `Lord Feexz`,
  email: `lordfeexz@gmail.com`,
  password: `qwertyui`,
  fullName: `Lord Feexz`,
};

let access_token;

beforeEach(async () => {
  jest.restoreAllMocks();
  const user = await User.create(testUser);
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  access_token = createToken(payload);
});

async function clearTables(tables) {
  await queryInterface.bulkDelete(`${tables}`, null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
}

afterEach(async () => {
  await clearTables("BalanceHistories");
  await clearTables("Users");
  await clearTables("Vehicles");
});

describe("post register customer", () => {
  it("post /register => fail test status(400),no username", async () => {
    const payload = {
      email: `lordfeexz2@gmail.com`,
      password: `qwertyui`,
      fullName: "Lord Feexz2",
    };
    const result = await request(app).post("/register").send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "username is required");
  });
});

describe("post register customer", () => {
  it("post /register => fail test status(400),username already use", async () => {
    const payload = {
      username: `Lord Feexz`,
      email: `lordfeexz2@gmail.com`,
      password: `qwertyui`,
      fullName: "Lord Feexz",
    };
    const result = await request(app).post("/register").send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "username is already use");
  });
});

describe("post register customer", () => {
  it("post /register => fail test status(400),no email", async () => {
    const payload = {
      username: `Lord Feexz2`,
      password: `qwertyui`,
      fullName: "Lord Feexz2",
    };
    const result = await request(app).post("/register").send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "email is required");
  });
});

describe("post register customer", () => {
  it("post /register => fail test status(400),no email format", async () => {
    const payload = {
      username: `Lord Feexz`,
      email: `lordfeexz2`,
      password: `qwertyui`,
      fullName: "Lord Feexz2",
    };
    const result = await request(app).post("/register").send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "use email format!");
  });
});

describe("post register customer", () => {
  it("post /register => fail test status(400),email already use", async () => {
    const payload = {
      username: `Lord Feexz7`,
      email: `lordfeexz@gmail.com`,
      password: `qwertyui`,
      fullName: "Lord Feexz7",
    };
    const result = await request(app).post("/register").send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "email is already use");
  });
});

describe("post register customer", () => {
  it("post /register => fail test status(400),no password", async () => {
    const payload = {
      username: `Lord Feexz`,
      email: `lordfeexz2@gmail.com`,
      fullName: "Lord Feexz2",
    };
    const result = await request(app).post("/register").send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "password is required");
  });
});

describe("post register customer", () => {
  it("post /register => fail test status(400),password length < 5", async () => {
    const payload = {
      username: `Lord Feexz`,
      email: `lordfeexz2@gmail.com`,
      password: `qwe`,
      fullName: "Lord Feexz2",
    };
    const result = await request(app).post("/register").send(payload);
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
      username: `Lord Feexz4`,
      email: `lordfeexz4@gmail.com`,
      password: `qwertyui`,
      fullName: "Lord Feexz4",
    };
    const result = await request(app).post("/register").send(payload);
    expect(result.status).toBe(201);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", "Check your email");
  });
});
