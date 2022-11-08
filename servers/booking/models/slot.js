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
      throw error;
    }
  }

  static async editSlot(id, payload, session) {
    try {
      const collection = getDB().collection("slots");
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

  static async findAllSlotBook(options) {
    try {
      const collection = getDB().collection("slots");

      const slots = await collection.aggregate([options]).toArray();
      return slots;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Slot;
