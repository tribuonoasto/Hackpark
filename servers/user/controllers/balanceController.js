const { BalanceHistory, User } = require("../models");
const env = require("../helpers/env");
const midtransClient = require("midtrans-client");
const Bank = require("../helpers/bank");
const core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: env.serverKey,
  clientKey: env.clientKey,
});

class Controller {
  static async getBalance(req, res, next) {
    try {
      const { id } = req.user;

      const balanceHistory = await BalanceHistory.findAll({
        where: {
          UserId: id,
        },
      });

      res.status(200).json(balanceHistory);
    } catch (err) {
      next(err);
    }
  }

  static async midTransRequest(req, res, next) {
    try {
      const { totalPrice, paymentStatus, bank } = req.body;
      const { id, email, username } = req.user;

      const transfer = new Bank(
        totalPrice,
        paymentStatus,
        bank,
        id,
        email,
        username
      ).body();

      const data = await core.charge(transfer);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async paymentNotif(req, res, next) {
    try {
      const data = await core.transaction.notification(req.body);

      const id = +data.order_id.split("-")[2].replace("$", "");

      if (data.transaction_status == "settlement") {
        const user = await User.findOne({
          where: {
            id,
          },
        });

        if (!user) throw { name: "User not found" };

        const balance = +data.gross_amount + user.balance;

        await User.update({ balance }, { where: { id } });

        res.status(200).json({ message: `${data.transaction_status}` });
      } else if (
        data.transaction_status == "cancel" ||
        data.transaction_status == "deny" ||
        data.transaction_status == "expire"
      ) {
        res.status(200).json({ message: `${data.transaction_status}` });
      } else if (data.transaction_status == "pending") {
        res.status(200).json({ message: `${data.transaction_status}` });
      } else if (data.transaction_status == "refund") {
        res.status(200).json({ message: `${data.transaction_status}` });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
