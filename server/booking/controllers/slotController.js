"use strict";
const Slot = require("../models/slot");

class SlotController {
  static async showAllSlots(req, res, next) {
    try {
      const slots = await Slot.findAll();

      if (!slots || slots.length <= 0) throw { name: "slot_not_found" };
      res.status(200).json(slots);
    } catch (error) {
      next(error);
    }
  }

  static async showOneSlot(req, res, next) {
    try {
      const { id } = req.params;

      const slot = await Slot.findOne(id);

      if (!slot) throw { name: "slot_not_found" };

      res.status(200).json(slot);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SlotController;
