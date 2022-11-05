const { BalanceHistory } = require("../models");
const env = require("../helpers/env");

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
      const { totalPrice, paymentStatus } = req.body;
      const { id, email, username } = req.user;

      const midtransClient = require("midtrans-client");

      const core = new midtransClient.CoreApi({
        isProduction: false,
        serverKey: env.serverKey,
        clientKey: env.clientKey,
      });

      const date = new Date().getMinutes();

      const parameter = {
        payment_type: "bank_transfer",
        transaction_details: {
          gross_amount: totalPrice,
          order_id: "order_" + date + id + totalPrice,
        },
        customer_details: {
          email: email,
          first_name: username,
        },
        item_details: [
          {
            price: totalPrice,
            quantity: 1,
            name: paymentStatus,
            merchant_name: "HackPark",
          },
        ],
      };

      const data = await core.charge(parameter);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
