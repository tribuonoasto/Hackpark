const express = require("express");
const router = express.Router();

router.use("/bookings", require("./bookings"));
router.use("/venues", require("./venues"));

module.exports = router;
