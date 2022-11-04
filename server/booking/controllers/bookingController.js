"use strict";
const Book = require("../models/booking");
const Slot = require("../models/slot");
const Venue = require("../models/venue");
const format = require("date-fns/format");
const { baseUrlLocal } = require("../helpers/baseUrl");
const axios = require("axios");
const ImageKit = require("imagekit");

class BookingController {
  static async createBooking(req, res, next) {
    try {
      const { UserId, SlotId, bookingDate } = req.body;

      if (!UserId || !SlotId) {
        throw {
          name: "invalid_validation",
          msg: "Invalid Input",
        };
      }

      //// AXIOS CEK USER ID

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
        UserId,
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
        publicKey: "public_bXQ7uTQf2/6T6321VRr80OJVjW8=",
        privateKey: "private_urjFImwY9MuKMsyuLsratYMWjYU=",
        urlEndpoint: "https://ik.imagekit.io/qjbbuf38o/",
      });

      const result = await imagekit.upload({
        file: bookingQrCode,
        fileName: "bookqrcode",
      });

      const urlQr = result.url;

      const newQr = await Book.editQr(newBookingId, urlQr);

      if (!newQr.acknowledged)
        throw {
          name: "invalid_Book",
          msg: "Error when booking parking slot",
        };

      res.status(201).json({ message: "slot booked" });
    } catch (error) {
      next(error);
    }
  }

  static async checkBooking(req, res, next) {
    try {
      res.status(201).json({ message: "asd" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookingController;
