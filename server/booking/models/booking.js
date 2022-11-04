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
          $set: { imgQrCode: payload },
        }
      );
      return resp;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Book;
