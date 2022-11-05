"use strict";
const { getDB } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class Book {
  static async insertOne(payload) {
    try {
      const collection = getDB().collection("bookings");
      const resp = await collection.insertOne(payload);
      return resp;
    } catch (error) {
      throw error;
    }
  }

  static async editQr(id, payload) {
    try {
      const collection = getDB().collection("bookings");
      const _id = ObjectId(id);

      const resp = await collection.updateOne(
        { _id },
        {
          $set: payload,
        }
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
      if (error.name === "BSONTypeError") {
        throw { name: "booking_not_found" };
      } else {
        throw error;
      }
    }
  }

  static async editStatus(id, payload) {
    try {
      const collection = getDB().collection("bookings");
      const _id = ObjectId(id);

      const resp = await collection.updateOne(
        { _id },
        {
          $set: payload,
        }
      );
      return resp;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Book;
