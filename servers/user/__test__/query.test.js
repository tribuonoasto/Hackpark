const app = require("../app");
const request = require("supertest");
const { sequelize, BalanceHistory, User } = require("../models");
const { createToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

const seedBalance = [
  {
    UserId: 1,
    dateTransaction: "2022-11-05T07:01:27.683Z",
    type: "kredit",
    amount: 7500,
    status: "Success",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    UserId: 1,
    dateTransaction: "2022-11-05T07:18:30.405Z",
    type: "kredit",
    amount: 7500,
    status: "Success",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const testUser = {
  username: `Lord Feexz5`,
  email: `lordfeexz5@gmail.com`,
  password: `qwertyui5`,
  fullName: `Lord Feexzzz`,
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date(),
  isRegis: true,
  balance: 2000000,
  imgUrl: "imgUrl.com",
};

let access_token;

beforeEach(async () => {
  const userTest = await User.create(testUser);
  const payload = {
    id: userTest.id,
    username: userTest.username,
    email: userTest.email,
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

describe("get all users", () => {
  it("get /users => success test status(200)", async () => {
    const result = await request(app)
      .get("/users")
      .set("access_token", access_token);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body[0]).toHaveProperty("id", expect.any(Number));
    expect(result.body[0]).toHaveProperty("username", expect.any(String));
    expect(result.body[0]).toHaveProperty("email", expect.any(String));
  });
});

describe("get user by id", () => {
  it("get /users/:id => success test status(200)", async () => {
    const id = 1;
    const result = await request(app)
      .get(`/users/${id}`)
      .set("access_token", access_token);
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
    const result = await request(app)
      .get(`/users/${id}`)
      .set("access_token", access_token);
    expect(result.status).toBe(404);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
  });
});

describe("delete user by id", () => {
  it("delete /users/:id => success test status(200)", async () => {
    const result = await request(app)
      .delete(`/users`)
      .set("access_token", access_token);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
  });
});

describe("patch user by id", () => {
  it("patch /users/:id => success test status(201)", async () => {
    const payload = { username: "patch username" };
    const result = await request(app)
      .patch(`/users/changeusername`)
      .send(payload)
      .set("access_token", access_token);
    expect(result.status).toBe(201);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
  });
});

describe("get all balance history", () => {
  it("get /balances => success test status(200)", async () => {
    await queryInterface.bulkInsert("BalanceHistories", seedBalance);
    const result = await request(app)
      .get("/balances")
      .set("access_token", access_token);
    expect(result.status).toBe(200);
  });
});
