const { BalanceHistory } = require("../models");
const env = require("../helpers/env");
const midtransClient = require("midtrans-client");
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
      const { totalPrice, paymentStatus } = req.body;
      const { id, email, username } = req.user;

      const parameter = {
        payment_type: "bank_transfer",
        transaction_details: {
          gross_amount: totalPrice,
          order_id: "order-id-" + Math.round(new Date().getTime() / 1000),
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

  static async checkTransactionStatus(req, res, next) {
    try {
      const data = await core.transaction.status(req.body.transaction_id);

      // if (data.transactionStatus == "settlement") {
      //   // TODO set transaction status on your databaase to 'success'
      //   // Note: Non card transaction will become 'settlement' on payment success
      //   // Credit card will also become 'settlement' D+1, which you can ignore
      //   // because most of the time 'capture' is enough to be considered as success
      // } else if (
      //   transactionStatus == "cancel" ||
      //   transactionStatus == "deny" ||
      //   transactionStatus == "expire"
      // ) {
      //   // TODO set transaction status on your databaase to 'failure'
      // } else if (transactionStatus == "pending") {
      //   // TODO set transaction status on your databaase to 'pending' / waiting payment
      // } else if (transactionStatus == "refund") {
      //   // TODO set transaction status on your databaase to 'refund'
      // }
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async notification(req, res, next) {
    try {
      const { transaction_id } = req.body;
      res.status(200).json(transaction_id);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
