"use strict";
const { getDB } = require("../config/mongo");

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
}
module.exports = Venue;
