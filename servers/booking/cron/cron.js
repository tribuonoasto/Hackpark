var cron = require("node-cron");
const Book = require("../models/booking");
const Slot = require("../models/slot");

const task = cron.schedule("* * * * *", async () => {
  // console.log("running a task every five minutes", new Date().toLocaleString());
  try {
    const bookings = await Book.findAll();

    const today = new Date();

    const expiredBook = bookings.filter((book) => {
      if (today > book.expiredDate && book.transactionStatus === "Booked") {
        return book;
      }
    });

    const bookPromise = expiredBook.map((book) => {
      const bookingId = book._id.toString();
      return Book.editBooking(bookingId, {
        transactionStatus: "Expired",
      });
    });

    Promise.allSettled(bookPromise);

    expiredBook.forEach(async (el) => {
      const checkSlot = await Slot.findOne(el.SlotId.toString());
      const currentSlot = checkSlot.slot + 1;
      await Slot.editSlot(el.SlotId, {
        slot: currentSlot,
      });
    });

    console.log("cron jalan");
  } catch (error) {
    next(error);
  }
});

module.exports = task;
