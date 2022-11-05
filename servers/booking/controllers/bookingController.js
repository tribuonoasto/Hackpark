"use strict";
const Book = require("../models/booking");
const Slot = require("../models/slot");
const Venue = require("../models/venue");
const format = require("date-fns/format");
const { baseUrlLocal, baseUrlLocalUser } = require("../helpers/baseUrl");
const axios = require("axios");
const ImageKit = require("imagekit");

class BookingController {
  static async createBooking(req, res, next) {
    try {
      const { UserId, SlotId, bookingDate, access_token } = req.body;

      if (!UserId || !SlotId) {
        throw {
          name: "invalid_validation",
          msg: "Invalid Input",
        };
      }

      //// AXIOS CEK USER ID
      const checkUser = await axios({
        method: "get",
        url: `${baseUrlLocalUser}/users/${UserId}`,
        headers: {
          access_token,
        },
      });

      if (!checkUser) {
        throw { name: "user_not_found" };
      }

      //// CEK SLOT
      const checkSlot = await Slot.findOne(SlotId);
      if (!checkSlot) {
        throw { name: "slot_not_found" };
      }

      //// CEK VENUE
      const venueId = checkSlot.VenueId.toString();
      const checkVenue = await Venue.findOne(venueId);
      if (!checkVenue) {
        throw { name: "venue_not_found" };
      }

      //// BOOKING
      const bookDate = bookingDate ? new Date(bookingDate) : new Date();
      const expiredDate = bookingDate ? new Date(bookingDate) : new Date();
      expiredDate.setHours(expiredDate.getHours() + 1);
      bookDate.toLocaleString("id-Id");
      expiredDate.toLocaleString("id-Id");

      const currentDay = format(bookDate, "EEEE");
      let priceAdjuster = 0;
      if (
        currentDay === "Monday" ||
        currentDay === "Tuesday" ||
        currentDay === "Wednesday" ||
        currentDay === "Thursday"
      ) {
        priceAdjuster = 1;
      } else {
        priceAdjuster = 2;
      }

      const venuePrice = checkVenue.bookingPrice;
      const multiplierPrice = await Venue.findOnePrice(priceAdjuster);
      const bookPrice = venuePrice * multiplierPrice.value;

      const resp = await Book.insertOne({
        UserId: +UserId,
        SlotId,
        bookingDate: bookDate,
        expiredDate: expiredDate,
        checkinDate: null,
        checkoutDate: null,
        transactionStatus: "Booked",
        paymentStatus: "Book paid",
        PriceAdjusterId: priceAdjuster,
        totalPrice: bookPrice,
        imgQrCode: "qrcode url",
      });

      if (!resp.acknowledged)
        throw {
          name: "invalid_Book",
          msg: "Error when booking parking slot",
        };

      //// QR CODE
      const newBookingId = resp.insertedId.toString();

      const qrCode = await axios({
        method: "get",
        url: `https://api.happi.dev/v1/qrcode?data=${
          baseUrlLocal + "/bookings/check/" + newBookingId
        }&width=128&dots=000000&bg=FFFFFF&apikey=e1ee22u5U687OdKoqo9yIbnrMeg12SJIuEHDkJkQ7UFq6QAQ9LICgMqZ`,
      });

      const bookingQrCode = qrCode.data.qrcode;

      const imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL,
      });

      const result = await imagekit.upload({
        file: bookingQrCode,
        fileName: "bookqrcode",
      });

      const urlQr = result.url;

      const newQr = await Book.editBooking(newBookingId, { imgQrCode: urlQr });

      if (!newQr.acknowledged)
        throw {
          name: "invalid_Book",
          msg: "Error when booking parking slot",
        };

      // PAYMENT WITH BALANCE
      const payment = await axios({
        method: "patch",
        url: `${baseUrlLocalUser}/users/changeBalancePayment`,
        headers: {
          access_token,
        },
        data: {
          price: bookPrice,
        },
      });

      if (!payment) {
        throw { name: "invaid_Book", msg: "Error when changin user balance" };
      }

      res.status(201).json({ message: "slot booked" });
    } catch (error) {
      next(error);
    }
  }

  static async checkBooking(req, res, next) {
    try {
      const { bookingId } = req.params;
      const { access_token } = req.body;

      const checkBooking = await Book.findOne(bookingId);

      if (!checkBooking) throw { name: "booking_not_found" };

      // console.log(checkBooking);

      if (checkBooking.transactionStatus === "Done") {
        throw { name: "already_paid" };
      }

      //// CHECK IN
      if (checkBooking.transactionStatus === "Booked") {
        const newBooking = await Book.editBooking(bookingId, {
          transactionStatus: "Inprogress",
          checkinDate: new Date(),
        });

        if (!newBooking.acknowledged) {
          throw { name: "invalid_Book", msg: "Error when check-in" };
        }
        res.status(200).json({ message: "Checkin Success" });
      } else if (checkBooking.transactionStatus === "Inprogress") {
        const checkOutBooking = await Book.editBooking(bookingId, {
          checkoutDate: new Date(),
        });

        if (!checkOutBooking.acknowledged) {
          throw { name: "invalid_Book", msg: "Error when check-out" };
        }

        const newBookingData = await Book.findOne(bookingId);

        const userCheckout = newBookingData.checkoutDate;
        const userCheckin = newBookingData.checkinDate;
        const checkHour = Math.floor(
          (userCheckout - userCheckin) / (1000 * 60 * 60)
        );

        //// CEK SLOT
        const checkSlot = await Slot.findOne(newBookingData.SlotId);
        if (!checkSlot) {
          throw { name: "slot_not_found" };
        }

        //// CEK VENUE
        const venueId = checkSlot.VenueId.toString();
        const checkVenue = await Venue.findOne(venueId);
        if (!checkVenue) {
          throw { name: "venue_not_found" };
        }

        const checkoutPrice =
          checkVenue.parkingPrice * (checkHour ? checkHour : 1);
        const newPrice = checkBooking.totalPrice + checkoutPrice;

        const payBooking = await Book.editBooking(bookingId, {
          totalPrice: newPrice,
        });

        if (!payBooking.acknowledged) {
          throw { name: "invalid_Book", msg: "Error when totalling price" };
        }

        // PAYMENT WITH BALANCE
        const payment = await axios({
          method: "patch",
          url: `${baseUrlLocalUser}/users/changeBalancePayment`,
          headers: {
            access_token,
          },
          data: {
            price: checkoutPrice,
          },
        });

        if (!payment) {
          throw { name: "invaid_Book", msg: "Error when changin user balance" };
        }

        const newBooking = await Book.editBooking(bookingId, {
          transactionStatus: "Done",
        });

        if (!newBooking.acknowledged) {
          throw { name: "invalid_Book", msg: "Error when check-out" };
        }

        res.status(200).json({ message: "Checkout Success" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookingController;
