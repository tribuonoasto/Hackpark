const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";

  console.log(err);

  if (err.name === "invalid_validation") {
    code = 400;
    message = err.msg;
  } else if (err.name === "invalid_Book") {
    code = 400;
    message = err.msg;
  } else if (err.name === "venue_not_found") {
    code = 404;
    message = "Venue Not Found";
  } else if (err.name === "slot_not_found") {
    code = 404;
    message = "Slot Not Found";
  } else if (err.name === "user_not_found") {
    code = 404;
    message = "User Not Found";
  } else if (err.response) {
    code = err.response.status;
    message = err.response.data.message;
  } else if (err.name === "booking_not_found") {
    code = 404;
    message = "Book Not Found";
  } else if (err.name === "already_paid") {
    code = 404;
    message = "This transaction is already paid";
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
