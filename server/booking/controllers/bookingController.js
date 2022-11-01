"use strict";

class BookingController {
  static async showAllBooking(req, res, next) {
    res.send("booking");
  }
}

module.exports = BookingController;
