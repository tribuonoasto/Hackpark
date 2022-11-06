const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://tribuonoasto:${process.env.MONGO_PASSWORD}@p3c2db.kpkllcd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
let db = null;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

async function mongoConnect() {
  try {
    if (process.env.NODE_ENV !== "test") {
      db = client.db("hackparkBooking");
    } else if (process.env.NODE_ENV === "test") {
      db = client.db("hackparkBookingTest");
    }
    return db;
  } catch (err) {
    console.log(err);
  }
}

async function mongoClear() {
  try {
    const collections = await getDB().collections();
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  } catch (err) {
    console.log(err);
  }
}

function getDB() {
  return db;
}

module.exports = { mongoConnect, getDB, client, mongoClear };
