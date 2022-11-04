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
}

module.exports = Controller;
