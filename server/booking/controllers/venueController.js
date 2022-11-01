"use strict";

class VenueController {
  static async showAllVenue(req, res, next) {
    res.send("venue");
  }
}

module.exports = VenueController;
