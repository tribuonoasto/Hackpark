const { Vehicle } = require("../models");
// const ImageKit = require("imagekit");
const fs = require("fs");
const env = require("../helpers/env");
const imagekit = require("../config/imageKit");

class Controller {
  static async getVehicle(req, res, next) {
    try {
      const { id } = req.user;

      const vehicle = await Vehicle.findAll({
        where: {
          UserId: id,
        },
      });

      if (!vehicle || vehicle.length <= 0) throw { name: "Vehicle not found" };

      res.status(200).json(vehicle);
    } catch (err) {
      next(err);
    }
  }

  static async changeImg(req, res, next) {
    try {
      const { id } = req.user;
      const { vehicleId } = req.params;
      console.log(vehicleId);
      const { path, filename, originalname } = req.file;

      const fileUploaded = fs.readFileSync(`./uploads/${filename}`);
      const result = await imagekit.upload({
        file: fileUploaded, //required
        fileName: filename, //required
      });

      const resp = await Vehicle.update(
        { imgUrl: result.url },
        { where: { UserId: id, id: vehicleId } }
      );

      if (resp[0] === 0) {
        throw { name: "upload_error" };
      }

      res.status(200).json({ message: "Success" });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const vehicle = await Vehicle.findOne({
        where: {
          id,
        },
      });

      if (!vehicle) throw { name: "Vehicle not found" };

      await Vehicle.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({ message: "success" });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { plat, modelName, name } = req.body;

      if (!plat || !modelName || !name) {
        throw { name: "invalid_input", msg: "Invalid Input" };
      }

      const UserId = req.user.id;

      await Vehicle.create({
        UserId,
        plat,
        modelName,
        name,
      });

      res.status(201).json({ message: "success create" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
