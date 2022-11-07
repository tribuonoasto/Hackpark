var cron = require("node-cron");
const Book = require("../models/booking");
const Slot = require("../models/slot");

const task = cron.schedule("* * * * *", async () => {
  // console.log("running a task every five minutes", new Date().toLocaleString());
  try {
    const bookings = await Book.findAll();

    if (!bookings || bookings.length <= 0) {
      res.status(200).json({ message: "No expired book found" });
    }

    const today = new Date();

    const expiredBook = bookings.filter((book) => {
      if (today > book.expiredDate && book.transactionStatus === "Booked") {
        return book;
      }
    });

    expiredBook.forEach(async (el) => {
      const bookingId = el._id.toString();
      await Book.editBooking(bookingId, {
        transactionStatus: "Expired",
      });
      const checkSlot = await Slot.findOne(el.SlotId);
      let currentSlot = checkSlot.slot;
      await Slot.editSlot(el.SlotId, {
        slot: currentSlot + expiredBook.length,
      });
    });

    res.status(200).json({ message: "Database booking up to date" });
  } catch (error) {
    next(error);
  }
});

module.exports = task;
