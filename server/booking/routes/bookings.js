const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/bookingController");

router.get("/", BookingController.showAllBooking);

module.exports = router;
