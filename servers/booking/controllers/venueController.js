"use strict";
const Venue = require("../models/venue");

class VenueController {
  static async showAllVenues(req, res, next) {
    try {
      const venues = await Venue.findAll();

      if (!venues || venues.length <= 0) throw { name: "venue_not_found" };
      res.status(200).json(venues);
    } catch (error) {
      next(error);
    }
  }

  static async showOneVenue(req, res, next) {
    try {
      const { id } = req.params;

      const venue = await Venue.findOne(id);

      if (!venue) throw { name: "venue_not_found" };

      res.status(200).json(venue);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = VenueController;
