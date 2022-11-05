const { User, BalanceHistory, Vehicle } = require("../models");
const ImageKit = require("imagekit");
const fs = require("fs");
class Controller {
  static async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll({
        include: [BalanceHistory, Vehicle],
      });

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
      res.status(201).json({ message: "Verified" });
    } catch (err) {
      next(err);
    }
  }

  static async changeImgUser(req, res, next) {
    try {
      const { id } = req.user;
      const { path, filename, originalname } = req.file;

      const imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL,
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
    try {
      const { id } = req.user;
      const { price } = req.body;

      if (!id) {
        throw { name: "invalid_input", msg: "Invalid ID" };
      }

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
        { where: { id } }
      );

      if (resp[0] === 0) {
        throw { name: "payment_error" };
      }

      const writeBalanceHistory = await BalanceHistory.create({
        UserId: id,
        dateTransaction: new Date(),
        type: "kredit",
        amount: price,
        status: "Success",
      });

      if (!writeBalanceHistory) {
        await BalanceHistory.create({
          UserId: id,
          dateTransaction: new Date(),
          type: "kredit",
          amount: price,
          status: "Failed",
        });

        throw { name: "payment_error" };
      }

      res.status(200).json({ message: "success change saldo" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
