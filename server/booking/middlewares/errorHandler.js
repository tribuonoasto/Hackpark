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
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
