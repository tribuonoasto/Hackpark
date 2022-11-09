var cron = require("node-cron");
const Book = require("../models/booking");
const Slot = require("../models/slot");
const format = require("date-fns/format");
const addDays = require("date-fns/addDays");

const yourFunction = async () => {
  try {
    const today = format(new Date(), "yyyy-MM-dd");
    const tommorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

    const slots = await Slot.findAllSlotBook({
      $lookup: {
        from: "bookings",
        let: {
          bookingDate: "$bookingDate",
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
                  { $gte: ["$bookingDate", new Date(today)] },
                  { $lt: ["$bookingDate", new Date(tommorrow)] },
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
        slot: slot.slot - slot.bookings.length,
      });
    });

    Promise.allSettled(slotPromise);
    return "cron jalan";
  } catch (error) {
    return error;
  }
};

const taskSlot = cron.schedule("* */23 * * *", yourFunction);

module.exports = { yourFunction, taskSlot };
