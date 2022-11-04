"use strict";
const Venue = require("../models/venue");

class VenueController {
  static async showAllVenue(req, res, next) {
    try {
      const venues = await Venue.findAll();

      if (!venues || venues.length <= 0) throw { name: "venue_not_found" };
      res.status(200).json(venues);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = VenueController;
