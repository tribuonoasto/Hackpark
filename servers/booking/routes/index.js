const express = require("express");
const router = express.Router();

router.use("/bookings", require("./bookings"));
router.use("/venues", require("./venues"));
router.use("/slots", require("./slots"));
router.use("/ratings", require("./ratings"));

module.exports = router;
