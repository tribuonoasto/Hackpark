const { User } = require("../models");

class Controller {
  static async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll();

      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      // disini
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      // disini
    } catch (err) {
      next(err);
    }
  }

  static async changeUsername(req, res, next) {
    try {
      // disini
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
