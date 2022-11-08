const { User, BalanceHistory, Vehicle, sequelize } = require("../models");
const ImageKit = require("imagekit");
const fs = require("fs");
const env = require("../helpers/env");
class Controller {
  static async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll({
        include: [BalanceHistory, Vehicle],
      });

      if (!users || users.length <= 0) throw { name: "User not found" };
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
        include: [BalanceHistory, Vehicle],
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

      if (!username) {
        throw { name: "invalid_input", msg: "Invalid username" };
      }

      const user = await User.findOne({
        where: { id },
      });

      if (!user) throw { name: "User not found" };

      if (user.username === username) throw { name: "username is already use" };

      await User.update({ username }, { where: { id } });

      res.status(201).json({ message: "success update username" });
    } catch (err) {
      next(err);
    }
  }

  static async verify(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findOne({
        where: { id },
      });

      if (!user) throw { name: "User not found" };

      const isRegis = true;

      await User.update(
        { isRegis },
        {
          where: {
            id: user.id,
          },
        }
      );
      res.status(200).json({ message: "Verified" });
    } catch (err) {
      next(err);
    }
  }

  static async changeImgUser(req, res, next) {
    try {
      const { id } = req.user;
      const { path, filename, originalname } = req.file;

      const imagekit = new ImageKit({
        publicKey: env.publicKey,
        privateKey: env.privateKey,
        urlEndpoint: env.urlEndpoint,
      });

      const fileUploaded = fs.readFileSync(`./uploads/${filename}`);
      const result = await imagekit.upload({
        file: fileUploaded, //required
        fileName: filename, //required
      });

      const resp = await User.update({ imgUrl: result.url }, { where: { id } });
      if (resp[0] === 0) {
        throw { name: "upload_error" };
      }

      res.status(201).json({ message: "success change image" });
    } catch (err) {
      next(err);
    }
  }

  static async changeBalancePayment(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.user;
      const { price } = req.body;

      if (!price) {
        throw { name: "invalid_input", msg: "Invalid Price" };
      }

      const user = await User.findOne({
        where: { id },
      });

      if (!user) throw { name: "User not found" };

      if (user.balance < price) {
        throw { name: "not_enough_balance" };
      }
      const newBalance = user.balance - price;

      const resp = await User.update(
        { balance: newBalance },
        { where: { id }, transaction: t }
      );

      if (resp[0] === 0) {
        await BalanceHistory.create(
          {
            UserId: id,
            type: "kredit",
            amount: price,
            status: "Failed",
          },
          { transaction: t }
        );

        throw { name: "payment_error" };
      }

      await BalanceHistory.create(
        {
          UserId: id,
          dateTransaction: new Date(),
          type: "kredit",
          amount: price,
          status: "Success",
        },
        { transaction: t }
      );
      await t.commit();

      res.status(200).json({ message: "success change saldo" });
    } catch (err) {
      next(err);
      await t.rollback();
    }
  }
}

module.exports = Controller;
