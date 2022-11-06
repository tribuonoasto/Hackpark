class Bank {
  constructor(totalPrice, paymentStatus, bank, id, email, username) {
    (this.totalPrice = totalPrice),
      (this.paymentStatus = paymentStatus),
      (this.bank = bank);
    (this.id = id), (this.email = email), (this.username = username);
  }

  parameter() {
    const parameter = {
      payment_type: "bank_transfer",
      transaction_details: {
        gross_amount: this.totalPrice,
        order_id:
          "order-id-" +
          "$" +
          this.id +
          "-" +
          Math.round(new Date().getTime() / 1000),
      },
      customer_details: {
        email: this.email,
        first_name: this.username,
      },
      item_details: [
        {
          price: this.totalPrice,
          quantity: 1,
          name: this.paymentStatus,
          merchant_name: "HackPark",
        },
      ],
    };

    return parameter;
  }

  bankTransfer() {
    if (this.bank.toLowerCase() == "bca") {
      const bank_transfer = {
        bank: this.bank.toUpperCase(),
        va_number: "12345678901",
        free_text: {
          inquiry: [
            {
              id: "selesaikan pembayaranmu",
              en: "finish your payment",
            },
          ],
        },
      };
      return bank_transfer;
    } else if (this.bank.toLowerCase() == "bni") {
      const bank_transfer = {
        bank: "BNI",
        va_number: "12345678",
        description: "text",
      };
      return bank_transfer;
    } else if (this.bank.toLowerCase() == "permata") {
      const bank_transfer = {
        bank: "PERMATA",
        va_number: "1234567890",
      };
      return bank_transfer;
    } else if (this.bank.toLowerCase() == "bri") {
      const bank_transfer = {
        bank: "bri",
        va_number: "8578000000111111",
      };
      return bank_transfer;
    }
  }

  body() {
    const {
      payment_type,
      transaction_details,
      customer_details,
      item_details,
    } = this.parameter();

    const bank_transfer = this.bankTransfer();

    const body = {
      payment_type,
      transaction_details,
      customer_details,
      item_details,
      bank_transfer,
    };
    return body;
  }
}

module.exports = Bank;
