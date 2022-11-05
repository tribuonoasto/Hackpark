const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";

  if (
    err.name == `SequelizeValidationError` ||
    err.name == `SequelizeUniqueConstraintError`
  ) {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name == "User not found" || err.name == "Vehicle not found") {
    status = 404;
    message = err.name;
  } else if (err.name == "invalid_credentials") {
    status = 401;
    message = "Invalid email/password";
  } else if (err.name == "username is already use") {
    status = 409;
    message = err.name;
  } else if (err.name == `invalid token` || err.name == `JsonWebTokenError`) {
    status = 401;
    message = `Invalid Token`;
  } else if (err.name == "email not send") {
    status = 501;
  } else if (err.name == `invalid_email`) {
    status = 400;
    message = "use real email";
  } else if (err.name == "Forbidden") {
    status = 403;
    message = err.name;
  } else if (err.name == `not_enough_balance`) {
    status = 400;
    message = "You don't have enough balance. please top-up";
  } else if (err.name == `invalid_input`) {
    status = 400;
    message = err.msg;
  } else if (err.name == `payment_error`) {
    status = 500;
    message = "Failed to pay";
  } else if (err.name == `upload_error`) {
    status = 500;
    message = "Failed to upload image";
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;
