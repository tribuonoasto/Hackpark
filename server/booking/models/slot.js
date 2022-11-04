"use strict";
const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongo");

class Slot {
  static async findAll() {
    try {
      const collection = getDB().collection("slots");

      const options = {};

      const slots = await collection.find({}, options).toArray();
      return slots;
    } catch (error) {
      throw error;
    }
  }

  static async findOne(id) {
    try {
      const collection = getDB().collection("slots");

      const options = {};

      const _id = ObjectId(id);

      const slot = await collection.findOne({ _id }, options);
      return slot;
    } catch (error) {
      if (error.name === "BSONTypeError") {
        throw { name: "slot_not_found" };
      } else {
        throw error;
      }
    }
  }
}
module.exports = Slot;