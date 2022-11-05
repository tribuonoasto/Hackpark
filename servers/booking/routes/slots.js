const express = require("express");
const router = express.Router();
const SlotController = require("../controllers/slotController");

router.get("/", SlotController.showAllSlots);
router.get("/:id", SlotController.showOneSlot);

module.exports = router;
