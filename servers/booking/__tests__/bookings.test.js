const app = require("../app");
const request = require("supertest");
const { mongoClear, getDB } = require("../config/mongo");
jest.setTimeout(10000);

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
    name: "PIM",
    address: "Jakarta Selatan",
    lat: -6.265382725121101,
    lng: 106.78440428824007,
    parkingPrice: 10000,
    bookingPrice: 10000,
    imgVenue:
      "https://awsimages.detik.net.id/visual/2021/05/03/dok-pondok-indah-mall_169.jpeg?w=650",
    description: "ini tempat parkir",
  },
  {
    name: "PIK Avenue",
    address: "Jakarta Utara",
    lat: -6.109064380689562,
    lng: 106.74044768424756,
    parkingPrice: 10000,
    bookingPrice: 10000,
    imgVenue:
      "https://cdn2.pikavenue.com/wp-content/uploads/2020/11/1280px-PIK_Avenue_tampak_depan.jpg",
    description: "ini tempat parkir",
  },
];

const docVenue = {
  name: "PIM",
  address: "Jakarta Selatan",
  lat: -6.265382725121101,
  lng: 106.78440428824007,
  parkingPrice: 10000,
  bookingPrice: 10000,
  imgVenue:
    "https://awsimages.detik.net.id/visual/2021/05/03/dok-pondok-indah-mall_169.jpeg?w=650",
  description: "ini tempat parkir",
};

const docsRatings = [
  {
    UserId: 1,
    VenueId: "636462155953fbd7317fad87",
    rating: 5,
  },
  {
    UserId: 1,
    VenueId: "636462e35953fbd7317fad88",
    rating: 3,
  },
];

const docRating = {
  UserId: 1,
  VenueId: "636462155953fbd7317fad87",
  rating: 5,
};

const docPri = [
  {
    _id: 1,
    name: "Weekdays",
    value: 1,
  },
  {
    _id: 2,
    name: "Weekend",
    value: 1.5,
  },
];

const docBookings = [
  {
    UserId: 1,
    SlotId: "6364c5698b3a2b673173d4e1",
    bookingDate: "November 04, 2022 04:24:00",
    expiredDate: "November 04, 2022 04:24:00",
    checkinDate: "November 04, 2022 04:24:00",
    checkoutDate: "November 04, 2022 04:24:00",
    transactionStatus: "Done",
    paymentStatus: "Paid",
    PriceAdjusterId: 2,
    totalPrice: 10500,
    imgQrCode: "https://ik.imagekit.io/qjbbuf38o/bookqrcode_Jr1BZI-Qi",
  },
  {
    UserId: 1,
    SlotId: "6364c5698b3a2b673173d4e1",
    bookingDate: "November 04, 2022 04:24:00",
    expiredDate: "November 04, 2022 04:24:00",
    checkinDate: "November 04, 2022 04:24:00",
    checkoutDate: "November 04, 2022 04:24:00",
    transactionStatus: "Done",
    paymentStatus: "Paid",
    PriceAdjusterId: 2,
    totalPrice: 10500,
    imgQrCode: "https://ik.imagekit.io/qjbbuf38o/bookqrcode_uLrrnxn5a",
  },
  {
    UserId: 1,
    SlotId: "6364c5698b3a2b673173d4e1",
    bookingDate: "November 04, 2022 04:24:00",
    expiredDate: "November 04, 2022 04:24:00",
    checkinDate: null,
    checkoutDate: null,
    transactionStatus: "Booked",
    paymentStatus: "Book Paid",
    PriceAdjusterId: 2,
    totalPrice: 7500,
    imgQrCode: "https://ik.imagekit.io/qjbbuf38o/bookqrcode_a_t4avp8G",
  },
  {
    UserId: 1,
    SlotId: "6364c5698b3a2b673173d4e1",
    bookingDate: "November 04, 2022 04:24:00",
    expiredDate: "November 04, 2022 04:24:00",
    checkinDate: "November 04, 2022 04:24:00",
    checkoutDate: null,
    transactionStatus: "Inprogress",
    paymentStatus: "Book Paid",
    PriceAdjusterId: 2,
    totalPrice: 7500,
    imgQrCode: "https://ik.imagekit.io/qjbbuf38o/bookqrcode_a_t4avp8G",
  },
];
const docBooking = {
  UserId: 1,
  SlotId: "6364c5698b3a2b673173d4e1",
  bookingDate: "November 04, 2022 04:24:00",
  expiredDate: "November 04, 2022 04:24:00",
  checkinDate: null,
  checkoutDate: null,
  transactionStatus: "Booked",
  paymentStatus: "Book Paid",
  PriceAdjusterId: 2,
  totalPrice: 7500,
  imgQrCode: "https://ik.imagekit.io/qjbbuf38o/bookqrcode_a_t4avp8G",
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
  test("GET /slots/:id - Fail test BSONTypeError", async () => {
    const id = 123;
    const result = await request(app).get(`/slots/${id}`);
    expect(result.status).toBe(400);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Id");
  });
});

describe("GET /slots/:id", () => {
  test("GET /slots/:id - Fail test notfound", async () => {
    const id = "6364c5698b3a2b673173d4e9";
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
    expect(result.body[0]).toHaveProperty("lat", expect.any(Number));
    expect(result.body[0]).toHaveProperty("lng", expect.any(Number));
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
    expect(result.body).toHaveProperty("lat", expect.any(Number));
    expect(result.body).toHaveProperty("lng", expect.any(Number));
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
  test("GET /venues/:id - Fail test BSONTypeError ", async () => {
    const id = 123;
    const result = await request(app).get(`/venues/${id}`);
    expect(result.status).toBe(400);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Id");
  });
});

describe("GET /venues/:id", () => {
  test("GET /venues/:id - Fail test not found ", async () => {
    const id = "636462e35953fbd7317fad82";
    const result = await request(app).get(`/venues/${id}`);
    expect(result.status).toBe(404);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Venue Not Found");
  });
});

describe("GET /ratings", () => {
  test("GET /rating - success test ", async () => {
    const collection = getDB().collection("ratings");
    await collection.insertMany(docsRatings);

    const result = await request(app).get("/ratings");
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body[0]).toHaveProperty("_id", expect.any(String));
    expect(result.body[0]).toHaveProperty("UserId", expect.any(Number));
    expect(result.body[0]).toHaveProperty("VenueId", expect.any(String));
    expect(result.body[0]).toHaveProperty("rating", expect.any(Number));
  });
});

describe("GET /ratings/:id", () => {
  test("GET /ratings/:id - success test ", async () => {
    const collection = getDB().collection("ratings");
    const resp = await collection.insertOne(docRating);
    const id = resp.insertedId.toString();

    const result = await request(app).get(`/ratings/${id}`);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("_id", expect.any(String));
    expect(result.body).toHaveProperty("_id", expect.any(String));
    expect(result.body).toHaveProperty("UserId", expect.any(Number));
    expect(result.body).toHaveProperty("VenueId", expect.any(String));
    expect(result.body).toHaveProperty("rating", expect.any(Number));
  });
});

describe("GET /ratings", () => {
  test("GET /ratings - Fail Test empty ratings ", async () => {
    const result = await request(app).get("/ratings");
    expect(result.status).toBe(404);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Rating Not Found");
  });
});

describe("GET /ratings/:id", () => {
  test("GET /ratings/:id - Fail test BSONTypeError ", async () => {
    const id = 123;
    const result = await request(app).get(`/ratings/${id}`);
    expect(result.status).toBe(400);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Id");
  });
});

describe("GET /ratings/:id", () => {
  test("GET /ratings/:id - Fail test notfound ", async () => {
    const id = "636725e85e1da27af51b5b33";
    const result = await request(app).get(`/ratings/${id}`);
    expect(result.status).toBe(404);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Rating Not Found");
  });
});

describe("POST /ratings", () => {
  test("POST /ratings - success test ", async () => {
    const payload = {
      UserId: 1,
      VenueId: "636462e35953fbd7317fad88",
      rating: 5,
    };
    const result = await request(app).post(`/ratings`).send(payload);
    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Rating Success");
  });
});

describe("POST /ratings", () => {
  test("POST /ratings - fail test invalid UserId", async () => {
    const payload = {
      UserId: null,
      VenueId: "636462e35953fbd7317fad88",
      rating: 5,
    };
    const result = await request(app).post(`/ratings`).send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Input");
  });
});

describe("POST /ratings", () => {
  test("POST /ratings - fail test invalid VenueId ", async () => {
    const payload = {
      UserId: 1,
      VenueId: null,
      rating: 5,
    };
    const result = await request(app).post(`/ratings`).send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Input");
  });
});

describe("POST /ratings", () => {
  test("POST /ratings - fail test invalid rating ", async () => {
    const payload = {
      UserId: 1,
      VenueId: "636462e35953fbd7317fad88",
      rating: null,
    };
    const result = await request(app).post(`/ratings`).send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Input");
  });
});

describe("POST /ratings", () => {
  test("POST /ratings - fail test user already rate ", async () => {
    const payload = {
      UserId: 1,
      VenueId: "636462e35953fbd7317fad88",
      rating: 5,
    };
    const seed = await request(app).post(`/ratings`).send(payload);
    const result = await request(app).post(`/ratings`).send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty(
      "message",
      "You already rate this venue"
    );
  });
});

describe("POST /bookings", () => {
  test("POST /bookings - success test weekend ", async () => {
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: idVen,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: slotId,
      bookingDate: "November 04, 2022 04:24:00",
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    };
    const result = await request(app).post(`/bookings`).send(payload);
    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "slot booked");
  });
});

describe("POST /bookings", () => {
  test("POST /bookings - success test weekdays ", async () => {
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: idVen,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: slotId,
      bookingDate: "November 02, 2022 04:24:00",
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    };
    const result = await request(app).post(`/bookings`).send(payload);
    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "slot booked");
  });
});

describe("POST /bookings", () => {
  test("POST /bookings - success test without date booking ", async () => {
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: idVen,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: slotId,
      bookingDate: null,
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    };
    const result = await request(app).post(`/bookings`).send(payload);
    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "slot booked");
  });
});

describe("POST /bookings", () => {
  test("POST /bookings - failt test invalid UserId", async () => {
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: idVen,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: null,
      SlotId: slotId,
      bookingDate: "November 04, 2022 04:24:00",
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    };
    const result = await request(app).post(`/bookings`).send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Input");
  });
});

describe("POST /bookings", () => {
  test("POST /bookings - failt test invalid SlotId", async () => {
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: idVen,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: null,
      bookingDate: "November 04, 2022 04:24:00",
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    };
    const result = await request(app).post(`/bookings`).send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Input");
  });
});

describe("POST /bookings", () => {
  test("POST /bookings - fail test invalid access token ", async () => {
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: idVen,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: slotId,
      bookingDate: "November 04, 2022 04:24:00",
      access_token: null,
    };
    const result = await request(app).post(`/bookings`).send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Input");
  });
});

describe("POST /bookings", () => {
  test("POST /bookings - fail test user not found", async () => {
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: idVen,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 10000,
      SlotId: slotId,
      bookingDate: "November 04, 2022 04:24:00",
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    };
    const result = await request(app).post(`/bookings`).send(payload);
    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "User not found");
  });
});

describe("POST /bookings", () => {
  test("POST /bookings - fail test slot not found", async () => {
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: idVen,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: 123,
      bookingDate: "November 04, 2022 04:24:00",
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    };
    const result = await request(app).post(`/bookings`).send(payload);
    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Slot Not Found");
  });
});

describe("POST /bookings", () => {
  test("POST /bookings - fail test venue not found BSONTypeError", async () => {
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: 123,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: slotId,
      bookingDate: "November 04, 2022 04:24:00",
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    };
    const result = await request(app).post(`/bookings`).send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Id");
  });
});

describe("POST /bookings", () => {
  test("POST /bookings - fail test venue not found", async () => {
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: "636462e35953fbd7317fad86",
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: slotId,
      bookingDate: "November 04, 2022 04:24:00",
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    };
    const result = await request(app).post(`/bookings`).send(payload);
    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Venue Not Found");
  });
});

describe("POST /bookings/check/:bookingId", () => {
  test("POST /bookings/check/:bookingId - success test check in  ", async () => {
    jest.setTimeout(30000);
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: idVen,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: slotId,
      bookingDate: {
        $date: {
          $numberLong: "1667724712258",
        },
      },
      expiredDate: {
        $date: {
          $numberLong: "1667728312258",
        },
      },
      checkinDate: null,
      checkoutDate: null,
      transactionStatus: "Booked",
      paymentStatus: "Book Paid",
      PriceAdjusterId: 2,
      totalPrice: 7500,
      imgQrCode: "https://ik.imagekit.io/qjbbuf38o/bookqrcode_nj4kxdUbn",
    };
    const collectionBook = getDB().collection("bookings");
    const respBook = await collectionBook.insertOne(payload);
    const idBook = respBook.insertedId.toString();

    const result = await request(app).post(`/bookings/check/${idBook}`).send({
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    });
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Checkin Success");
  });
});

describe("POST /bookings/check/:bookingId", () => {
  test("POST /bookings/check/:bookingId - success test check out  ", async () => {
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: idVen,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: slotId,
      bookingDate: {
        $date: {
          $numberLong: "1667728491549",
        },
      },
      expiredDate: {
        $date: {
          $numberLong: "1667732091549",
        },
      },
      checkinDate: {
        $date: {
          $numberLong: "1667728505766",
        },
      },
      checkoutDate: null,
      transactionStatus: "Inprogress",
      paymentStatus: "Book Paid",
      PriceAdjusterId: 2,
      totalPrice: 7500,
      imgQrCode: "https://ik.imagekit.io/qjbbuf38o/bookqrcode_iXCf00BeR",
    };
    const collectionBook = getDB().collection("bookings");
    const respBook = await collectionBook.insertOne(payload);
    const idBook = respBook.insertedId.toString();

    const result = await request(app).post(`/bookings/check/${idBook}`).send({
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    });
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Checkout Success");
  });
});

describe("POST /bookings/check/:bookingId", () => {
  test("POST /bookings/check/:bookingId - fail test check in already paid  ", async () => {
    jest.setTimeout(30000);
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: idVen,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: slotId,
      bookingDate: {
        $date: {
          $numberLong: "1667726482853",
        },
      },
      expiredDate: {
        $date: {
          $numberLong: "1667730082853",
        },
      },
      checkinDate: {
        $date: {
          $numberLong: "1667726501282",
        },
      },
      checkoutDate: {
        $date: {
          $numberLong: "1667726516067",
        },
      },
      transactionStatus: "Done",
      paymentStatus: "Paid",
      PriceAdjusterId: 2,
      totalPrice: 10500,
      imgQrCode: "https://ik.imagekit.io/qjbbuf38o/bookqrcode_Dd_91Ro9j",
    };
    const collectionBook = getDB().collection("bookings");
    const respBook = await collectionBook.insertOne(payload);
    const idBook = respBook.insertedId.toString();

    const result = await request(app).post(`/bookings/check/${idBook}`).send({
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    });
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty(
      "message",
      "This transaction is already paid"
    );
  });
});

describe("POST /bookings/check/:bookingId", () => {
  test("POST /bookings/check/:bookingId - fail test check out slot not found ", async () => {
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: idVen,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: "6364c5698b3a2b673173d4e9",
      bookingDate: {
        $date: {
          $numberLong: "1667724712258",
        },
      },
      expiredDate: {
        $date: {
          $numberLong: "1667728312258",
        },
      },
      checkinDate: null,
      checkoutDate: null,
      transactionStatus: "Booked",
      paymentStatus: "Book Paid",
      PriceAdjusterId: 2,
      totalPrice: 7500,
      imgQrCode: "https://ik.imagekit.io/qjbbuf38o/bookqrcode_nj4kxdUbn",
    };
    const collectionBook = getDB().collection("bookings");
    const respBook = await collectionBook.insertOne(payload);
    const idBook = respBook.insertedId.toString();

    const result = await request(app).post(`/bookings/check/${idBook}`).send({
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    });
    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Slot Not Found");
  });
});

describe("POST /bookings/check/:bookingId", () => {
  test("POST /bookings/check/:bookingId - fail test check out slot not found  ", async () => {
    jest.setTimeout(30000);
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: idVen,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: null,
      bookingDate: {
        $date: {
          $numberLong: "1667728491549",
        },
      },
      expiredDate: {
        $date: {
          $numberLong: "1667732091549",
        },
      },
      checkinDate: {
        $date: {
          $numberLong: "1667728505766",
        },
      },
      checkoutDate: null,
      transactionStatus: "Inprogress",
      paymentStatus: "Book Paid",
      PriceAdjusterId: 2,
      totalPrice: 7500,
      imgQrCode: "https://ik.imagekit.io/qjbbuf38o/bookqrcode_iXCf00BeR",
    };
    const collectionBook = getDB().collection("bookings");
    const respBook = await collectionBook.insertOne(payload);
    const idBook = respBook.insertedId.toString();

    const result = await request(app).post(`/bookings/check/${idBook}`).send({
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    });
    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Slot Not Found");
  });
});

describe("POST /bookings/check/:bookingId", () => {
  test("POST /bookings/check/:bookingId - fail test check out venue not found BSONTypeError  ", async () => {
    jest.setTimeout(30000);
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: 123,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: slotId,
      bookingDate: {
        $date: {
          $numberLong: "1667728491549",
        },
      },
      expiredDate: {
        $date: {
          $numberLong: "1667732091549",
        },
      },
      checkinDate: {
        $date: {
          $numberLong: "1667728505766",
        },
      },
      checkoutDate: null,
      transactionStatus: "Inprogress",
      paymentStatus: "Book Paid",
      PriceAdjusterId: 2,
      totalPrice: 7500,
      imgQrCode: "https://ik.imagekit.io/qjbbuf38o/bookqrcode_iXCf00BeR",
    };
    const collectionBook = getDB().collection("bookings");
    const respBook = await collectionBook.insertOne(payload);
    const idBook = respBook.insertedId.toString();

    const result = await request(app).post(`/bookings/check/${idBook}`).send({
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    });
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Id");
  });
});

describe("POST /bookings/check/:bookingId", () => {
  test("POST /bookings/check/:bookingId - fail test check out venue not found  ", async () => {
    jest.setTimeout(30000);
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: "636462155953fbd7317fad82",
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: slotId,
      bookingDate: {
        $date: {
          $numberLong: "1667728491549",
        },
      },
      expiredDate: {
        $date: {
          $numberLong: "1667732091549",
        },
      },
      checkinDate: {
        $date: {
          $numberLong: "1667728505766",
        },
      },
      checkoutDate: null,
      transactionStatus: "Inprogress",
      paymentStatus: "Book Paid",
      PriceAdjusterId: 2,
      totalPrice: 7500,
      imgQrCode: "https://ik.imagekit.io/qjbbuf38o/bookqrcode_iXCf00BeR",
    };
    const collectionBook = getDB().collection("bookings");
    const respBook = await collectionBook.insertOne(payload);
    const idBook = respBook.insertedId.toString();

    const result = await request(app).post(`/bookings/check/${idBook}`).send({
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    });
    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Venue Not Found");
  });
});

describe("POST /bookings/check/:bookingId", () => {
  test("POST /bookings/check/:bookingId - fail test invalid bookId BSONTypeError  ", async () => {
    jest.setTimeout(30000);
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: idVen,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: slotId,
      bookingDate: {
        $date: {
          $numberLong: "1667724712258",
        },
      },
      expiredDate: {
        $date: {
          $numberLong: "1667728312258",
        },
      },
      checkinDate: null,
      checkoutDate: null,
      transactionStatus: "Booked",
      paymentStatus: "Book Paid",
      PriceAdjusterId: 2,
      totalPrice: 7500,
      imgQrCode: "https://ik.imagekit.io/qjbbuf38o/bookqrcode_nj4kxdUbn",
    };
    const collectionBook = getDB().collection("bookings");
    const respBook = await collectionBook.insertOne(payload);
    const idBook = 123;

    const result = await request(app).post(`/bookings/check/${idBook}`).send({
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    });
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Id");
  });
});

describe("POST /bookings/check/:bookingId", () => {
  test("POST /bookings/check/:bookingId - fail test invalid bookId  ", async () => {
    jest.setTimeout(30000);
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: idVen,
      slot: 100,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: slotId,
      bookingDate: {
        $date: {
          $numberLong: "1667724712258",
        },
      },
      expiredDate: {
        $date: {
          $numberLong: "1667728312258",
        },
      },
      checkinDate: null,
      checkoutDate: null,
      transactionStatus: "Booked",
      paymentStatus: "Book Paid",
      PriceAdjusterId: 2,
      totalPrice: 7500,
      imgQrCode: "https://ik.imagekit.io/qjbbuf38o/bookqrcode_nj4kxdUbn",
    };
    const collectionBook = getDB().collection("bookings");
    const respBook = await collectionBook.insertOne(payload);
    const idBook = "63678d38f09d87710f6cb033";

    const result = await request(app).post(`/bookings/check/${idBook}`).send({
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    });
    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Book Not Found");
  });
});

describe("POST /bookings", () => {
  test("POST /bookings - fail test 0 parking slot ", async () => {
    const collectionPri = getDB().collection("priceAdjuster");
    await collectionPri.insertMany(docPri);

    const collectionVen = getDB().collection("venues");
    const respVen = await collectionVen.insertOne(docVenue);
    const idVen = respVen.insertedId.toString();

    const collection = getDB().collection("slots");
    const resp = await collection.insertOne({
      VenueId: idVen,
      slot: 0,
      floor: 1,
      name: "m2",
    });
    const slotId = resp.insertedId.toString();

    const payload = {
      UserId: 1,
      SlotId: slotId,
      bookingDate: "November 02, 2022 04:24:00",
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0cmlidW9ub2FzdG8iLCJlbWFpbCI6InRyaWJ1b25vYXN0b0BnbWFpbC5jb20iLCJpYXQiOjE2Njc2MjEyNzZ9.Hbt3lw0hPqPmRLj4TpLh5Pj_yYLtw--yENqeTxxuumo",
    };
    const result = await request(app).post(`/bookings`).send(payload);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "This Park Slot is empty");
  });
});

describe("GET /bookings", () => {
  test("GET /bookings - success test get all bookings ", async () => {
    const collection = getDB().collection("bookings");
    await collection.insertMany(docBookings);

    const result = await request(app).get("/bookings");
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body[0]).toHaveProperty("_id", expect.any(String));
    expect(result.body[0]).toHaveProperty("UserId", expect.any(Number));
    expect(result.body[0]).toHaveProperty("SlotId", expect.any(String));
    expect(result.body[0]).toHaveProperty(
      "transactionStatus",
      expect.any(String)
    );
    if (result.body[0].transactionStatus === "Done") {
      expect(result.body[0]).toHaveProperty("bookingDate", expect.any(String));
      expect(result.body[0]).toHaveProperty("expiredDate", expect.any(String));
      expect(result.body[0]).toHaveProperty("checkinDate", expect.any(String));
      expect(result.body[0]).toHaveProperty("checkoutDate", expect.any(String));
    } else if (result.body[0].transactionStatus === "Inprogress") {
      expect(result.body[0]).toHaveProperty("bookingDate", expect.any(String));
      expect(result.body[0]).toHaveProperty("expiredDate", expect.any(String));
      expect(result.body[0]).toHaveProperty("checkinDate", expect.any(String));
      expect(result.body[0]).toHaveProperty("checkoutDate", null);
    } else if (result.body[0].transactionStatus === "Booked") {
      expect(result.body[0]).toHaveProperty("bookingDate", expect.any(String));
      expect(result.body[0]).toHaveProperty("expiredDate", expect.any(String));
      expect(result.body[0]).toHaveProperty("checkinDate", null);
      expect(result.body[0]).toHaveProperty("checkoutDate", null);
    }
    expect(result.body[0]).toHaveProperty("paymentStatus", expect.any(String));
    expect(result.body[0]).toHaveProperty(
      "PriceAdjusterId",
      expect.any(Number)
    );
    expect(result.body[0]).toHaveProperty("totalPrice", expect.any(Number));
    expect(result.body[0]).toHaveProperty("imgQrCode", expect.any(String));
  });
});

describe("GET /bookings/:id", () => {
  test("GET /bookings/:id - success test get one booking ", async () => {
    const collection = getDB().collection("bookings");
    const resp = await collection.insertOne(docBooking);
    const id = resp.insertedId.toString();

    const result = await request(app).get(`/bookings/${id}`);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("_id", expect.any(String));
    expect(result.body).toHaveProperty("UserId", expect.any(Number));
    expect(result.body).toHaveProperty("SlotId", expect.any(String));
    expect(result.body).toHaveProperty("transactionStatus", expect.any(String));
    if (result.body.transactionStatus === "Done") {
      expect(result.body).toHaveProperty("bookingDate", expect.any(String));
      expect(result.body).toHaveProperty("expiredDate", expect.any(String));
      expect(result.body).toHaveProperty("checkinDate", expect.any(String));
      expect(result.body).toHaveProperty("checkoutDate", expect.any(String));
    } else if (result.body.transactionStatus === "Inprogress") {
      expect(result.body).toHaveProperty("bookingDate", expect.any(String));
      expect(result.body).toHaveProperty("expiredDate", expect.any(String));
      expect(result.body).toHaveProperty("checkinDate", expect.any(String));
      expect(result.body).toHaveProperty("checkoutDate", null);
    } else if (result.body.transactionStatus === "Booked") {
      expect(result.body).toHaveProperty("bookingDate", expect.any(String));
      expect(result.body).toHaveProperty("expiredDate", expect.any(String));
      expect(result.body).toHaveProperty("checkinDate", null);
      expect(result.body).toHaveProperty("checkoutDate", null);
    }
    expect(result.body).toHaveProperty("paymentStatus", expect.any(String));
    expect(result.body).toHaveProperty("PriceAdjusterId", expect.any(Number));
    expect(result.body).toHaveProperty("totalPrice", expect.any(Number));
    expect(result.body).toHaveProperty("imgQrCode", expect.any(String));
  });
});

describe("GET /bookings/:id", () => {
  test("GET /bookings/:id - fail test booking id  BSONTypeError ", async () => {
    const collection = getDB().collection("bookings");
    const resp = await collection.insertOne(docBooking);
    const id = 123;

    const result = await request(app).get(`/bookings/${id}`);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Invalid Id");
  });
});

describe("GET /bookings/:id", () => {
  test("GET /bookings/:id - fail test booking id not found ", async () => {
    const collection = getDB().collection("bookings");
    const resp = await collection.insertOne(docBooking);
    const id = "63678d9a01fae5930c59c23f";

    const result = await request(app).get(`/bookings/${id}`);
    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Book Not Found");
  });
});

describe("GET /bookings", () => {
  test("GET /bookings - success test get all bookings ", async () => {
    const result = await request(app).get("/bookings");
    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "Book Not Found");
  });
});
