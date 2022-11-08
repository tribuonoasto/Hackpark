var cron = require("node-cron");
const Book = require("../models/booking");
const Slot = require("../models/slot");

const taskSlot = cron.schedule("*/10 * * * * *", async () => {
  try {
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
                  { $gte: ["$bookingDate", new Date("2022-11-08")] },
                  { $lt: ["$bookingDate", new Date("2022-11-11")] },
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

    // const bookings = await Book.findAllBookSlot(
    //   {
    //     $lookup: {
    //       from: "slots",
    //       localField: "SlotId",
    //       foreignField: "_id",
    //       as: "myslot",
    //     },
    //   },
    //   { $limit: 1 }
    // );

    // const date = new Date();

    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();

    // let currentDate = `${day}-${month}-${year}`;

    // const todayBooked = bookings.filter((book) => {
    //   const dateBook = book.bookingDate;
    //   let dayBook = dateBook.getDate();
    //   let monthBook = dateBook.getMonth() + 1;
    //   let yearBook = dateBook.getFullYear();

    //   let dateBooking = `${dayBook}-${monthBook}-${yearBook}`;

    //   if (currentDate === dateBooking) {
    //     return book;
    //   }
    // });

    // const slotPromise = todayBooked.map((book) => {
    //   console.log(book);
    //   return Slot.editSlot(book.myslot[0]._id.toString(), {
    //     slot: book.myslot[0].slot - 1,
    //   });
    // });
    // Promise.allSettled(slotPromise);
    // todayBooked.forEach(async (el) => {
    //   const checkSlot = await Slot.findOne(el.SlotId);
    //   const currentSlot = checkSlot.slot - 1;
    //   await Slot.editSlot(el.SlotId, {
    //     slot: currentSlot,
    //   });
    // });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = taskSlot;
