const request = require("supertest");
const { sequelize, User } = require("../models");
const app = require("../app");
const { createToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

const testUser = {
  username: `Lord Feexz`,
  email: `lordfeexz3@gmail.com`,
  password: `qwertyui`,
  fullName: `Lord Feexz`,
};

let access_token;

beforeAll(async () => {
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

afterAll(async () => {
  await clearTables("Users");
});

describe("post login customer", () => {
  it("post /login => success test status(200)", async () => {
    const payload = {
      email: `lordfeexz3@gmail.com`,
      password: `qwertyui`,
    };
    const result = await request(app).post("/login").send(payload);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("access_token", expect.any(String));
    expect(result.body).toHaveProperty("id", expect.any(Number));
    expect(result.body).toHaveProperty("username", expect.any(String));
    expect(result.body).toHaveProperty("email", expect.any(String));
  });
});

describe("post login customer", () => {
  it("post /login => fail test status(401)", async () => {
    const payload = {
      email: `lordfeexz3@gmail.com`,
      password: `qwe`,
    };
    const result = await request(app).post("/login").send(payload);
    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message", "Invalid email/password");
  });
});

describe("post login customer", () => {
  it("post /login => fail test status(401)", async () => {
    const payload = {
      email: `udin@gmail.com`,
      password: `qwertyui`,
    };
    const result = await request(app).post("/login").send(payload);
    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message", "Invalid email/password");
  });
});
