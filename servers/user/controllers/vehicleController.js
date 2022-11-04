const { Vehicle } = require("../models");

class Controller {
  static async getVehicle(req, res, next) {
    try {
      const { id } = req.user;

      const vehicle = await Vehicle.findOne({
        where: {
          UserId: id,
        },
      });

      res.status(200).json(vehicle);
    } catch (err) {
      next(err);
    }
  }

  static async changeImg(req, res, next) {
    try {
      const { imgUrl } = req.body;

      const { id } = req.user;

      const vehicle = await Vehicle.findOne({
        where: {
          UserId: id,
        },
      });

      if (!vehicle) throw { name: "Vehicle not found" };

      await Vehicle.update({ imgUrl }, { where: { UserId: id } });

      res.status(201).json({ message: "Success" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
