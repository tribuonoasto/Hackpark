const app = require("../app");
const request = require("supertest");
const Venue = require("../models/venue");
const { mongoConnect, mongoClear, mongoClose } = require("../config/mongo");

beforeAll(async () => await mongoConnect());
afterEach(async () => await mongoClear());

describe("GET /venues", () => {
  test("GET /venues - success test ", async () => {
    const result = await request(app).get("/venues");
    console.log(result.body);
  });
});
