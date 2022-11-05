const express = require("express");
const router = express.Router();
const RatingController = require("../controllers/ratingController");

router.get("/", RatingController.showAllRatings);
router.post("/", RatingController.insertRating);
router.get("/:id", RatingController.showOneRating);

module.exports = router;
