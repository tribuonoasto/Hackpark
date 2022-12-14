"use strict";
const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongo");

class Rating {
  static async insertOne(payload) {
    try {
      const collection = getDB().collection("ratings");
      const resp = await collection.insertOne(payload);
      return resp;
    } catch (error) {
      throw error;
    }
  }

  static async findAll(query) {
    try {
      const collection = getDB().collection("ratings");

      const ratings = await collection.find(query).toArray();
      return ratings;
    } catch (error) {
      throw error;
    }
  }

  static async findOne(id) {
    try {
      const collection = getDB().collection("ratings");

      const options = {};

      const _id = ObjectId(id);

      const rating = await collection.findOne({ _id }, options);
      return rating;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Rating;
