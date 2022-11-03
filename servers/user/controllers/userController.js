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
      const { id } = req.params;

      const user = await User.findOne({
        where: { id },
      });

      if (!user) throw { name: "User not found" };

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.findOne({
        where: { id },
      });

      if (!user) throw { name: "User not found" };

      await User.destroy({ where: { id } });

      res.status(200).json({ message: "Success delete user" });
    } catch (err) {
      next(err);
    }
  }

  static async changeUsername(req, res, next) {
    try {
      const { id } = req.user;
      const { username } = req.body;
      const user = await User.findOne({
        where: { id },
      });

      if (!user) throw { name: "User not found" };

      await User.update({ username }, { where: { id } });

      res.status(201).json({ message: "success update username" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
