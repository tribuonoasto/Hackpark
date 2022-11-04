"use strict";
const { getDB } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class Venue {
  static async findAll() {
    try {
      const collection = getDB().collection("venues");

      const options = {};

      const venues = await collection.find({}, options).toArray();
      return venues;
    } catch (error) {
      throw error;
    }
  }

  static async findOne(id) {
    try {
      const collection = getDB().collection("venues");

      const options = {};

      const _id = ObjectId(id);

      const venue = await collection.findOne({ _id }, options);
      return venue;
    } catch (error) {
      if (error.name === "BSONTypeError") {
        throw { name: "venue_not_found" };
      } else {
        throw error;
      }
    }
  }

  static async findOnePrice(_id) {
    try {
      const collection = getDB().collection("priceAdjuster");

      const options = {};

      const priceAdjuster = await collection.findOne({ _id }, options);
      return priceAdjuster;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Venue;
