const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/bookingController");

router.post("/", BookingController.createBooking);
router.get("/", BookingController.showAllBookings);
router.post("/check/:bookingId", BookingController.checkBooking);
router.delete("/:id", BookingController.destroy);
router.get("/:id", BookingController.showOneBooking);

module.exports = router;
