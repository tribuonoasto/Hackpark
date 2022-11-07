const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/bookingController");

router.post("/", BookingController.createBooking);
router.get("/", BookingController.showAllBookings);
router.get("/:id", BookingController.showOneBooking);
router.post("/check/:bookingId", BookingController.checkBooking);

module.exports = router;
