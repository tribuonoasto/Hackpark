const express = require("express");
const router = express.Router();
const VenueController = require("../controllers/venueController");

router.get("/", VenueController.showAllVenues);
router.get("/:id", VenueController.showOneVenue);

module.exports = router;
