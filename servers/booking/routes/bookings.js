const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/bookingController");

router.post("/", BookingController.createBooking);
router.post("/check/:bookingId", BookingController.checkBooking);

module.exports = router;
