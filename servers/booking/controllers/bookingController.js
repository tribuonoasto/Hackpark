"use strict";
const Book = require("../models/booking");
const Slot = require("../models/slot");
const Venue = require("../models/venue");
const format = require("date-fns/format");
const { baseUrlLocal, baseUrlLocalUser } = require("../helpers/baseUrl");
const axios = require("axios");
const ImageKit = require("imagekit");
const { client } = require("../config/mongo");

class BookingController {
  static async createBooking(req, res, next) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        const { UserId, SlotId, bookingDate, access_token } = req.body;

        if (!UserId || !SlotId || !access_token) {
          throw {
            name: "invalid_validation",
            msg: "Invalid Input",
          };
        }

        //// AXIOS CEK USER ID
        await axios({
          method: "get",
          url: `${baseUrlLocalUser}/users/${UserId}`,
          headers: {
            access_token,
          },
        });

        //// CEK SLOT
        const checkSlot = await Slot.findOne(SlotId);
        if (!checkSlot) {
          throw { name: "slot_not_found" };
        }

        if (checkSlot.slot <= 0) {
          throw { name: "slot_empty" };
        }

        let currentSlot = checkSlot.slot;

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

        // PAYMENT WITH BALANCE
        await axios({
          method: "patch",
          url: `${baseUrlLocalUser}/users/changeBalancePayment`,
          headers: {
            access_token,
          },
          data: {
            price: bookPrice,
          },
        });

        //// CREATE BOOKING

        const resp = await Book.insertOne(
          {
            UserId: +UserId,
            SlotId,
            bookingDate: bookDate,
            expiredDate: expiredDate,
            checkinDate: null,
            checkoutDate: null,
            transactionStatus: "Booked",
            paymentStatus: "Book Paid",
            PriceAdjusterId: priceAdjuster,
            totalPrice: bookPrice,
            imgQrCode: "qrcode url",
          },
          { session }
        );

        if (!resp.acknowledged)
          throw {
            name: "invalid_Book",
            msg: "Error when booking parking slot",
          };

        //// DECREASE PARKING SLOT
        await Slot.editSlot(SlotId, {
          slot: currentSlot - 1,
        });

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

        const newQr = await Book.editBooking(
          newBookingId,
          {
            imgQrCode: urlQr,
          },
          { session }
        );

        if (!newQr.acknowledged)
          throw {
            name: "invalid_Book",
            msg: "Error when booking parking slot",
          };
        res.status(201).json({ message: "slot booked" });
      });
    } catch (error) {
      next(error);
    } finally {
      await session.endSession();
    }
  }

  static async checkBooking(req, res, next) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        const { bookingId } = req.params;
        const { access_token } = req.body;

        const checkBooking = await Book.findOne(bookingId);

        if (!checkBooking) throw { name: "booking_not_found" };

        if (checkBooking.transactionStatus === "Done") {
          throw { name: "already_paid" };
        }

        //// CEK SLOT
        const checkSlot = await Slot.findOne(checkBooking.SlotId);
        if (!checkSlot) {
          throw { name: "slot_not_found" };
        }

        //// CEK VENUE
        const venueId = checkSlot.VenueId.toString();
        const checkVenue = await Venue.findOne(venueId);
        if (!checkVenue) {
          throw { name: "venue_not_found" };
        }

        //// CHECK IN
        if (checkBooking.transactionStatus === "Booked") {
          const newBooking = await Book.editBooking(
            bookingId,
            {
              transactionStatus: "Inprogress",
              checkinDate: new Date(),
            },
            { session }
          );

          if (!newBooking.acknowledged) {
            throw { name: "invalid_Book", msg: "Error when check-in" };
          }
          res.status(200).json({ message: "Checkin Success" });
        } else if (checkBooking.transactionStatus === "Inprogress") {
          const checkOutBooking = await Book.editBooking(
            bookingId,
            {
              checkoutDate: new Date(),
            },
            { session }
          );

          if (!checkOutBooking.acknowledged) {
            throw { name: "invalid_Book", msg: "Error when check-out" };
          }

          const userCheckout = new Date();
          const userCheckin = checkBooking.checkinDate;
          const checkHour = Math.floor(
            (userCheckout - userCheckin) / (1000 * 60 * 60)
          );

          const checkoutPrice =
            checkVenue.parkingPrice * (checkHour ? checkHour : 1);
          const newPrice = checkBooking.totalPrice + checkoutPrice;

          const payBooking = await Book.editBooking(
            bookingId,
            {
              totalPrice: newPrice,
            },
            { session }
          );

          if (!payBooking.acknowledged) {
            throw { name: "invalid_Book", msg: "Error when totalling price" };
          }

          // PAYMENT WITH BALANCE
          await axios({
            method: "patch",
            url: `${baseUrlLocalUser}/users/changeBalancePayment`,
            headers: {
              access_token,
            },
            data: {
              price: checkoutPrice,
            },
          });

          const newBooking = await Book.editBooking(
            bookingId,
            {
              transactionStatus: "Done",
              paymentStatus: "Paid",
            },
            { session }
          );

          if (!newBooking.acknowledged) {
            throw { name: "invalid_Book", msg: "Error when check-out" };
          }

          //// DECREASE PARKING SLOT
          let currentSlot = checkSlot.slot;
          await Slot.editSlot(checkBooking.SlotId, {
            slot: currentSlot + 1,
          });

          res.status(200).json({ message: "Checkout Success" });
        }
      });
    } catch (error) {
      next(error);
    } finally {
      await session.endSession();
    }
  }

  static async showAllBookings(req, res, next) {
    try {
      const bookings = await Book.findAll();

      if (!bookings || bookings.length <= 0)
        throw { name: "booking_not_found" };
      res.status(200).json(bookings);
    } catch (error) {
      next(error);
    }
  }

  static async showOneBooking(req, res, next) {
    try {
      const { id } = req.params;

      const book = await Book.findOne(id);

      if (!book) throw { name: "booking_not_found" };

      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookingController;
