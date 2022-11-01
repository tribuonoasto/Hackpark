const express = require("express");
const router = express.Router();
const VenueController = require("../controllers/venueController");

router.get("/", VenueController.showAllVenue);

module.exports = router;
