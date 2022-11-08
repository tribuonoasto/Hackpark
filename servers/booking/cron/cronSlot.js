var cron = require("node-cron");
const Book = require("../models/booking");
const Slot = require("../models/slot");

const taskSlot = cron.schedule("* * * * *", async () => {
  try {
    const bookings = await Book.findAll();

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;

    const todayBooked = bookings.filter((book) => {
      const dateBook = book.bookingDate;
      let dayBook = dateBook.getDate();
      let monthBook = dateBook.getMonth() + 1;
      let yearBook = dateBook.getFullYear();

      let dateBooking = `${dayBook}-${monthBook}-${yearBook}`;

      if (currentDate === dateBooking) {
        return book;
      }
    });

    console.log(todayBooked);
  } catch (error) {
    next(error);
  }
});

module.exports = taskSlot;
