"use strict";
const { getDB } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class Book {
  static async insertOne(payload, session) {
    try {
      const collection = getDB().collection("bookings");
      const resp = await collection.insertOne(payload, session);
      return resp;
    } catch (error) {
      throw error;
    }
  }

  static async editBooking(id, payload, session) {
    try {
      const collection = getDB().collection("bookings");
      const _id = ObjectId(id);

      const resp = await collection.updateOne(
        { _id },
        {
          $set: payload,
        },
        session
      );
      return resp;
    } catch (error) {
      throw error;
    }
  }

  static async findOne(id) {
    try {
      const collection = getDB().collection("bookings");

      const options = {};

      const _id = ObjectId(id);

      const booking = await collection.findOne({ _id }, options);
      return booking;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const collection = getDB().collection("bookings");

      const options = {};

      const bookings = await collection.find({}, options).toArray();
      return bookings;
    } catch (error) {
      throw error;
    }
  }

  static async destroy(data) {
    try {
      const collection = getDB().collection("bookings");
      return await collection.findOneAndDelete({ _id: ObjectId(data) });
    } catch (err) {
      throw err;
    }
  }
}
module.exports = Book;
