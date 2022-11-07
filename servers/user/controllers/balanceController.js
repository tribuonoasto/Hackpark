const { BalanceHistory, User, sequelize } = require("../models");
const env = require("../helpers/env");
const midtransClient = require("midtrans-client");
const Bank = require("../helpers/bank");
const sha512 = require("js-sha512");
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

      const { order_id, status_code, gross_amount } = data;

      const signatureKey = sha512(
        order_id + status_code + gross_amount + env.serverKey
      );

      req.midtrans = signatureKey;

      let resp;

      if (bank.toLowerCase() == "permata") {
        const {
          status_code,
          status_message,
          transaction_id,
          order_id,
          gross_amount,
          payment_type,
          transaction_time,
          transaction_status,
          fraud_status,
          permata_va_number,
          merchant_id,
        } = data;
        resp = {
          status_code,
          status_message,
          transaction_id,
          order_id,
          gross_amount,
          payment_type,
          transaction_time,
          transaction_status,
          fraud_status,
          va_numbers: permata_va_number,
          merchant_id,
        };
      } else if (bank.toLowerCase() != "permata") {
        const {
          status_code,
          status_message,
          transaction_id,
          order_id,
          merchant_id,
          gross_amount,
          payment_type,
          transaction_time,
          transaction_status,
          va_numbers,
          fraud_status,
        } = data;
        resp = {
          status_code,
          status_message,
          transaction_id,
          order_id,
          merchant_id,
          gross_amount,
          payment_type,
          transaction_time,
          transaction_status,
          va_numbers: va_numbers[0].va_number,
          fraud_status,
        };
      }

      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  }

  static async paymentNotif(req, res, next) {
    const t = await sequelize.transaction();
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

        await User.update({ balance }, { where: { id }, transaction: t });

        const balanceHistory = await BalanceHistory.create({
          UserId: id,
          type: "debit",
          amount: +data.gross_amount,
          status: "Success",
        });

        if (!balanceHistory) {
          await BalanceHistory.create(
            {
              UserId: id,
              type: "debit",
              amount: +data.gross_amount,
              status: "Failed",
            },
            { transaction: t }
          );

          throw { name: "payment_error" };
        }

        await t.commit();

        res.status(200).json({ message: `${data.transaction_status}` });
      } else if (
        data.transaction_status == "cancel" ||
        data.transaction_status == "deny" ||
        data.transaction_status == "expire"
      ) {
        await BalanceHistory.create({
          UserId: id,
          type: "debit",
          amount: +data.gross_amount,
          status: `${data.transaction_status}`,
        });

        res.status(200).json({ message: `${data.transaction_status}` });
      } else if (data.transaction_status == "pending") {
        res.status(200).json({ message: `${data.transaction_status}` });
      } else if (data.transaction_status == "refund") {
        await BalanceHistory.create({
          UserId: id,
          type: "debit",
          amount: +data.gross_amount,
          status: `${data.transaction_status}`,
        });

        res.status(200).json({ message: `${data.transaction_status}` });
      }
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}

module.exports = Controller;
