const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://tribuonoasto:${process.env.MONGO_PASSWORD}@p3c2db.kpkllcd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
let db = null;

async function mongoConnect() {
  try {
    db = client.db("hackparkBooking");
    return db;
  } catch (err) {
    console.log(err);
  }
}

function getDB() {
  return db;
}

module.exports = { mongoConnect, getDB, client };
