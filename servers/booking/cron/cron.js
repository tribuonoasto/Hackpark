var cron = require("node-cron");
const Book = require("../models/booking");
const Slot = require("../models/slot");

const taskFunction = async () => {
  try {
    const slots = await Slot.findAllSlotBook({
      $lookup: {
        from: "bookings",
        let: {
          expiredDate: "$expiredDate",
          transactionStatus: "$transactionStatus",
        },
        localField: "_id",
        foreignField: "SlotId",
        as: "bookings",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $lt: ["$expiredDate", new Date()] },
                  { $eq: ["$transactionStatus", "Booked"] },
                ],
              },
            },
          },
        ],
      },
    });

    const slotPromise = slots.map((slot) => {
      return Slot.editSlot(slot._id.toString(), {
        slot: slot.slot + slot.bookings.length,
      });
    });

    Promise.allSettled(slotPromise);

    const bookPromise = slots.map((slot) => {
      return slot.bookings.map((book) => {
        return Book.editBooking(book._id.toString(), {
          transactionStatus: "Expired",
        });
      });
    });

    Promise.allSettled(bookPromise);

    return "cron jalan";
  } catch (error) {
    return error;
  }
};

const task = cron.schedule("* * * * *", taskFunction);

module.exports = { taskFunction, task };
