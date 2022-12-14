const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";

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
  } else if (err.response) {
    code = err.response.status;
    message = err.response.data.message;
  } else if (err.name === "booking_not_found") {
    code = 404;
    message = "Book Not Found";
  } else if (err.name === "already_paid") {
    code = 400;
    message = "This transaction is already paid";
  } else if (err.name === "rating_not_found") {
    code = 404;
    message = "Rating Not Found";
  } else if (err.name === "already_rate") {
    code = 400;
    message = "You already rate this venue";
  } else if (err.name === "invalid_input") {
    code = 400;
    message = "Invalid Input";
  } else if (err.name === "slot_empty") {
    code = 400;
    message = "This Park Slot is empty";
  } else if (err.name === "BSONTypeError") {
    code = 400;
    message = "Invalid Id";
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
