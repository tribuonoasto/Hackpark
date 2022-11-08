var cron = require("node-cron");
const Book = require("../models/booking");
const Slot = require("../models/slot");
const format = require("date-fns/format");
const addDays = require("date-fns/addDays");

const taskSlot = cron.schedule("* */23 * * *", async () => {
  try {
    const today = format(new Date(), "yyyy-MM-dd");
    const tommorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

    const slots = await Slot.findAllSlotBook({
      $lookup: {
        from: "bookings",
        let: {
          bookingDate: "$bookingDate",
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
    console.log("cron jalan");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = taskSlot;
