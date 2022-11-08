const app = require("../app");
const request = require("supertest");
const { sequelize, BalanceHistory, User } = require("../models");
const { createToken } = require("../helpers/jwt");
const { JsonWebTokenError } = require("jsonwebtoken");
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

const seedVehicles = [
  {
    UserId: 1,
    plat: "B5555HTH",
    modelName: "Avanza",
    name: "mobil",
    imgUrl: null,
    createdAt: "2022-11-05T12:45:01.129Z",
    updatedAt: "2022-11-05T12:45:01.129Z",
  },
  {
    UserId: 1,
    plat: "B1234JKL",
    modelName: "Avanza",
    name: "mobil",
    imgUrl:
      "https://ik.imagekit.io/qjbbuf38o/1667652365591--Hack_1_E9B1VJClb.png",
    createdAt: "2022-11-05T12:45:01.129Z",
    updatedAt: "2022-11-05T12:46:08.078Z",
  },
  {
    UserId: 1,
    plat: "B3212NM",
    modelName: "Avanza",
    name: "mobil",
    imgUrl:
      "https://ik.imagekit.io/qjbbuf38o/1667652797930--Hack_1_dh9PuTKD4.png",
    createdAt: "2022-11-05T12:45:01.129Z",
    updatedAt: "2022-11-05T12:53:20.393Z",
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

const testUser3 = {
  username: `Lord Feexz55`,
  email: `lordfeexz55@gmail.com`,
  password: `qwertyui55`,
  fullName: `Lord Feexzzz55`,
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date(),
  isRegis: false,
  balance: 2000000,
  imgUrl: "imgUrl.com",
};

const testUser2 = {
  username: `Lord Feexz6`,
  email: `lordfeexz6@gmail.com`,
  password: `qwertyui6`,
  fullName: `Lord Feexzzz6`,
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date(),
  isRegis: false,
  balance: 2000000,
  imgUrl: "imgUrl.com",
};

const seedBalanceHistories = [
  {
    UserId: 1,
    type: "debut",
    dateTransaction: new Date(),
    amount: 10000,
    status: "pending",
    signatureKey:
      "cd28f8370b90a909baebfaf4c838bde60dfbd1d7e8a00de5f6e07f9edabd6cad91d67ba7be9c36015d534c9f337aa12dc4eae9945e1515af6baad73f3d15cc0d",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let access_token;
let access_token3;

beforeEach(async () => {
  jest.restoreAllMocks();
  const userTest = await User.create(testUser);
  const userTest3 = await User.create(testUser3);
  const payload = {
    id: userTest.id,
    username: userTest.username,
    email: userTest.email,
  };
  const payload3 = {
    id: userTest3.id,
    username: userTest3.username,
    email: userTest3.email,
  };
  access_token = createToken(payload);
  access_token3 = createToken(payload3);
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

describe("get all users", () => {
  it("get /users => fail test invalid access_token", async () => {
    const result = await request(app).get("/vehicles");
    expect(result.status).toBe(401);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Token");
  });
});

describe("get all users", () => {
  it("get /users => fail test invalid authorization", async () => {
    const result = await request(app)
      .get("/vehicles")
      .set("access_token", access_token3);
    expect(result.status).toBe(403);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Forbidden");
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
    expect(result.body).toHaveProperty("message", "success update username");
  });
});

describe("patch user by id", () => {
  it("patch /users/:id => fail test invalid username", async () => {
    const payload = { username: null };
    const result = await request(app)
      .patch(`/users/changeusername`)
      .send(payload)
      .set("access_token", access_token);
    expect(result.status).toBe(400);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid username");
  });
});

describe("get all balance history", () => {
  it("get /balances => success test status(200)", async () => {
    await queryInterface.bulkInsert("BalanceHistories", seedBalance);
    const result = await request(app)
      .get("/balances")
      .set("access_token", access_token);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body[0]).toHaveProperty("id", expect.any(Number));
    expect(result.body[0]).toHaveProperty("UserId", expect.any(Number));
    expect(result.body[0]).toHaveProperty(
      "dateTransaction",
      expect.any(String)
    );
    expect(result.body[0]).toHaveProperty("type", expect.any(String));
    expect(result.body[0]).toHaveProperty("amount", expect.any(Number));
    expect(result.body[0]).toHaveProperty("status", expect.any(String));
    expect(result.body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(result.body[0]).toHaveProperty("updatedAt", expect.any(String));
  });
});

describe("get all balance history", () => {
  it("get /balances => fail test status(404)", async () => {
    const result = await request(app)
      .get("/balances")
      .set("access_token", access_token);
    expect(result.status).toBe(404);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Balance not found");
  });
});

describe("get all users", () => {
  it("get /users => fail test empty", async () => {
    await clearTables("Users");
    const result = await request(app)
      .get("/users")
      .set("access_token", access_token);
    console.log(result.body);
    expect(result.status).toBe(404);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "User not found");
  });
});

describe("verify users", () => {
  it("get /users => fail test empty", async () => {
    const userTest2 = await User.create(testUser2);
    const result = await request(app).get(`/users/verify/${userTest2.id}`);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Verified");
  });
});

describe("change balance payment", () => {
  it("get /users/changeBalancePayment => success test", async () => {
    const result = await request(app)
      .patch(`/users/changeBalancePayment`)
      .set("access_token", access_token)
      .send({
        price: 10000,
      });

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "success change saldo");
  });
});

describe("change balance payment", () => {
  it("get /users/changeBalancePayment => fail test", async () => {
    const result = await request(app)
      .patch(`/users/changeBalancePayment`)
      .set("access_token", access_token)
      .send({
        price: 10000000000,
      });

    expect(result.status).toBe(400);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty(
      "message",
      "You don't have enough balance. please top-up"
    );
  });
});

describe("change balance payment", () => {
  it("get /users/changeBalancePayment => fail test", async () => {
    const result = await request(app)
      .patch(`/users/changeBalancePayment`)
      .set("access_token", access_token);

    expect(result.status).toBe(400);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Price");
  });
});

describe("get all vehicles", () => {
  it("get /vehicles => success test status(200)", async () => {
    await queryInterface.bulkInsert("Vehicles", seedVehicles);
    const result = await request(app)
      .get("/vehicles")
      .set("access_token", access_token);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body[0]).toHaveProperty("id", expect.any(Number));
    expect(result.body[0]).toHaveProperty("UserId", expect.any(Number));
    expect(result.body[0]).toHaveProperty("plat", expect.any(String));
    expect(result.body[0]).toHaveProperty("modelName", expect.any(String));
    expect(result.body[0]).toHaveProperty("name", expect.any(String));
    expect(result.body[0]).toHaveProperty("imgUrl");
    expect(result.body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(result.body[0]).toHaveProperty("updatedAt", expect.any(String));
  });
});

describe("get all vehicles", () => {
  it("get /vehicles => success test status(200)", async () => {
    const result = await request(app)
      .get("/vehicles")
      .set("access_token", access_token);
    expect(result.status).toBe(404);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Vehicle not found");
  });
});

describe("delete vehicles by id", () => {
  it("get /vehicles/:id => success status 200", async () => {
    await queryInterface.bulkInsert("Vehicles", seedVehicles);
    const id = 1;
    const result = await request(app)
      .delete(`/vehicles/${id}`)
      .set("access_token", access_token);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "success");
  });
});

describe("delete vehicles by id", () => {
  it("get /vehicles/:id => fail vehicle not found", async () => {
    await queryInterface.bulkInsert("Vehicles", seedVehicles);
    const id = 999;
    const result = await request(app)
      .delete(`/vehicles/${id}`)
      .set("access_token", access_token);
    expect(result.status).toBe(404);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Vehicle not found");
  });
});

describe("create new vehicle", () => {
  it("get /vehicles/:id => success status 201", async () => {
    const payload = {
      plat: "B1234KLT",
      modelName: "Avanza",
      name: "mobilku",
    };
    const result = await request(app)
      .post(`/vehicles`)
      .send(payload)
      .set("access_token", access_token);
    expect(result.status).toBe(201);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "success create");
  });
});

describe("create new vehicle", () => {
  it("get /vehicles/:id => fail test invalid input", async () => {
    const payload = {
      plat: null,
      modelName: null,
      name: null,
    };
    const result = await request(app)
      .post(`/vehicles`)
      .send(payload)
      .set("access_token", access_token);
    expect(result.status).toBe(400);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Input");
  });
});

describe("get all balance history", () => {
  it("get /balances => success test status(200)", async () => {
    const payload = {
      totalPrice: 10000,
      paymentStatus: "topup",
      bank: "permata",
    };
    const result = await request(app)
      .post("/balances/payment")
      .send(payload)
      .set("access_token", access_token);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("status_code", expect.any(String));
    expect(result.body).toHaveProperty("status_message", expect.any(String));
    expect(result.body).toHaveProperty("transaction_id", expect.any(String));
    expect(result.body).toHaveProperty("order_id", expect.any(String));
    expect(result.body).toHaveProperty("merchant_id", expect.any(String));
    expect(result.body).toHaveProperty("gross_amount", expect.any(String));
    expect(result.body).toHaveProperty("payment_type", expect.any(String));
    expect(result.body).toHaveProperty("transaction_time", expect.any(String));
    expect(result.body).toHaveProperty(
      "transaction_status",
      expect.any(String)
    );
    expect(result.body).toHaveProperty("va_numbers", expect.any(String));
    expect(result.body).toHaveProperty("fraud_status", expect.any(String));
  });
});

describe("get all balance history", () => {
  it("get /balances => success test status(200)", async () => {
    const payload = {
      totalPrice: 10000,
      paymentStatus: "topup",
      bank: "bca",
    };
    const result = await request(app)
      .post("/balances/payment")
      .send(payload)
      .set("access_token", access_token);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("status_code", expect.any(String));
    expect(result.body).toHaveProperty("status_message", expect.any(String));
    expect(result.body).toHaveProperty("transaction_id", expect.any(String));
    expect(result.body).toHaveProperty("order_id", expect.any(String));
    expect(result.body).toHaveProperty("merchant_id", expect.any(String));
    expect(result.body).toHaveProperty("gross_amount", expect.any(String));
    expect(result.body).toHaveProperty("payment_type", expect.any(String));
    expect(result.body).toHaveProperty("transaction_time", expect.any(String));
    expect(result.body).toHaveProperty(
      "transaction_status",
      expect.any(String)
    );
    expect(result.body).toHaveProperty("va_numbers", expect.any(String));
    expect(result.body).toHaveProperty("fraud_status", expect.any(String));
  });
});

describe("get all balance history", () => {
  it("get /balances => success test status(200)", async () => {
    const payload = {
      totalPrice: null,
      paymentStatus: null,
      bank: null,
    };
    const result = await request(app)
      .post("/balances/payment")
      .send(payload)
      .set("access_token", access_token);
    expect(result.status).toBe(400);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Input");
  });
});

describe("get all balance history", () => {
  it("get /balances => success test status(200)", async () => {
    await queryInterface.bulkInsert("BalanceHistories", seedBalanceHistories);
    const payload = {
      va_numbers: [{ va_number: "66777597948", bank: "bca" }],
      transaction_time: "2022-11-08 00:04:29",
      transaction_status: "settlement",
      transaction_id: "fbb8baae-4841-459e-8c03-aeaefe4cd572",
      status_message: "midtrans payment notification",
      status_code: "200",
      signature_key:
        "cd28f8370b90a909baebfaf4c838bde60dfbd1d7e8a00de5f6e07f9edabd6cad91d67ba7be9c36015d534c9f337aa12dc4eae9945e1515af6baad73f3d15cc0d",
      settlement_time: "2022-11-08 00:05:14",
      payment_type: "bank_transfer",
      payment_amounts: [],
      order_id: "order-id-$1-1667840670",
      merchant_id: "G748966777",
      gross_amount: "10000.00",
      fraud_status: "accept",
      currency: "IDR",
    };
    const result = await request(app).post("/notification").send(payload);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "settlement");
  });
});

describe("change image user", () => {
  it("get /changeImg => success test change image", async () => {
    const result = await request(app)
      .patch(`/users/changeImg`)
      .set("access_token", access_token)
      .attach("image", "uploads/2.jpg");
    expect(result.status).toBe(201);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "success change image");
  });
});

describe("change image user", () => {
  it("get /changeImg => success test change image", async () => {
    await queryInterface.bulkInsert("Vehicles", seedVehicles);
    const vehiclesId = 1;
    const result = await request(app)
      .patch(`/vehicles/${vehiclesId}`)
      .set("access_token", access_token)
      .attach("image", "uploads/2.jpg");
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Success");
  });
});

// jest.mock("imagekit");
const ImageKit = require("imagekit");
const imagekit = require("../config/imageKit");

describe("change image user", () => {
  it.only("get /changeImg => success test change image", async () => {
    jest.spyOn(imagekit, "upload").mockResolvedValue({ url: "asd.com" });
    await queryInterface.bulkInsert("Vehicles", seedVehicles);
    const vehiclesId = 1;
    const result = await request(app)
      .patch(`/vehicles/${vehiclesId}`)
      .set("access_token", access_token)
      .attach("image", "uploads/2.jpg");
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Success");
  });
});
