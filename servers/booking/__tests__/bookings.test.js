const app = require("../app");
const request = require("supertest");
const { mongoClear, getDB } = require("../config/mongo");

const docsSlots = [
  {
    VenueId: "636462155953fbd7317fad87",
    slot: 100,
    floor: 1,
    name: "m1",
  },
  {
    VenueId: "636462155953fbd7317fad87",
    slot: 100,
    floor: 1,
    name: "m2",
  },
];

const docSlot = {
  VenueId: "636462155953fbd7317fad87",
  slot: 100,
  floor: 1,
  name: "m2",
};

const docsVenues = [
  {
    id: 1,
    name: "PIM",
    address: "Jakarta Selatan",
    lat: "-6.265382725121101",
    lng: "106.78440428824007",
    parkingPrice: 10000,
    bookingPrice: 10000,
    imgVenue:
      "https://awsimages.detik.net.id/visual/2021/05/03/dok-pondok-indah-mall_169.jpeg?w=650",
    description: "ini tempat parkir",
  },
  {
    id: 2,
    name: "PIK Avenue",
    address: "Jakarta Utara",
    lat: "-6.109064380689562",
    lng: "106.74044768424756",
    parkingPrice: 10000,
    bookingPrice: 10000,
    imgVenue:
      "https://cdn2.pikavenue.com/wp-content/uploads/2020/11/1280px-PIK_Avenue_tampak_depan.jpg",
    description: "ini tempat parkir",
  },
];

const docVenue = {
  id: 1,
  name: "PIM",
  address: "Jakarta Selatan",
  lat: "-6.265382725121101",
  lng: "106.78440428824007",
  parkingPrice: 10000,
  bookingPrice: 10000,
  imgVenue:
    "https://awsimages.detik.net.id/visual/2021/05/03/dok-pondok-indah-mall_169.jpeg?w=650",
  description: "ini tempat parkir",
};

afterEach(async () => await mongoClear());

describe("GET /slots", () => {
  test("GET /slots - success test ", async () => {
    const collection = getDB().collection("slots");
    await collection.insertMany(docsSlots);

    const result = await request(app).get("/slots");
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body[0]).toHaveProperty("_id", expect.any(String));
    expect(result.body[0]).toHaveProperty("name", expect.any(String));
    expect(result.body[0]).toHaveProperty("VenueId", expect.any(String));
    expect(result.body[0]).toHaveProperty("slot", expect.any(Number));
    expect(result.body[0]).toHaveProperty("floor", expect.any(Number));
  });
});

describe("GET /slots/:id", () => {
  test("GET /slots/:id - success test ", async () => {
    const collection = getDB().collection("slots");
    const resp = await collection.insertOne(docSlot);
    const id = resp.insertedId.toString();

    const result = await request(app).get(`/slots/${id}`);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("_id", expect.any(String));
    expect(result.body).toHaveProperty("name", expect.any(String));
    expect(result.body).toHaveProperty("VenueId", expect.any(String));
    expect(result.body).toHaveProperty("slot", expect.any(Number));
    expect(result.body).toHaveProperty("floor", expect.any(Number));
  });
});

describe("GET /slots", () => {
  test("GET /slots - Fail Test empty slots ", async () => {
    const result = await request(app).get("/slots");
    expect(result.status).toBe(404);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Slot Not Found");
  });
});

describe("GET /slots/:id", () => {
  test("GET /slots/:id - Fail test ", async () => {
    const id = null;
    const result = await request(app).get(`/slots/${id}`);
    expect(result.status).toBe(404);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Slot Not Found");
  });
});

describe("GET /venues", () => {
  test("GET /venues - success test ", async () => {
    const collection = getDB().collection("venues");
    await collection.insertMany(docsVenues);

    const result = await request(app).get("/venues");
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body[0]).toHaveProperty("_id", expect.any(String));
    expect(result.body[0]).toHaveProperty("name", expect.any(String));
    expect(result.body[0]).toHaveProperty("lat", expect.any(String));
    expect(result.body[0]).toHaveProperty("lng", expect.any(String));
    expect(result.body[0]).toHaveProperty("parkingPrice", expect.any(Number));
    expect(result.body[0]).toHaveProperty("bookingPrice", expect.any(Number));
    expect(result.body[0]).toHaveProperty("imgVenue", expect.any(String));
    expect(result.body[0]).toHaveProperty("description", expect.any(String));
  });
});

describe("GET /venues/:id", () => {
  test("GET /venues/:id - success test ", async () => {
    const collection = getDB().collection("venues");
    const resp = await collection.insertOne(docVenue);
    const id = resp.insertedId.toString();

    const result = await request(app).get(`/venues/${id}`);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("_id", expect.any(String));
    expect(result.body).toHaveProperty("name", expect.any(String));
    expect(result.body).toHaveProperty("lat", expect.any(String));
    expect(result.body).toHaveProperty("lng", expect.any(String));
    expect(result.body).toHaveProperty("parkingPrice", expect.any(Number));
    expect(result.body).toHaveProperty("bookingPrice", expect.any(Number));
    expect(result.body).toHaveProperty("imgVenue", expect.any(String));
    expect(result.body).toHaveProperty("description", expect.any(String));
  });
});

describe("GET /venues", () => {
  test("GET /venues - Fail Test empty venues ", async () => {
    const result = await request(app).get("/venues");
    expect(result.status).toBe(404);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Venue Not Found");
  });
});

describe("GET /venues/:id", () => {
  test("GET /venues/:id - Fail test ", async () => {
    const id = null;
    const result = await request(app).get(`/venues/${id}`);
    expect(result.status).toBe(404);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Venue Not Found");
  });
});
