const errorHandler = (err, req, res, next) => {
  console.log(err);
  let status = 500;
  let message = "Internal Server Error";

  console.log(err);

  if (err.name === `SequelizeUniqueConstraintError`) {
    if (err.parent.constraint === "Users_email_key") {
      status = 400;
      message = "email is already use";
    } else {
      status = 400;
      message = err.errors[0].message;
    }
  } else if (err.name === `SequelizeValidationError`) {
    status = 400;
    message = err.errors[0].message;
  } else if (
    err.name == "User not found" ||
    err.name == "Vehicle not found" ||
    err.name === "Balance not found"
  ) {
    status = 404;
    message = err.name;
  } else if (err.name == "invalid_credentials") {
    status = 401;
    message = "Invalid email/password";
  } else if (err.name == `invalid token` || err.name == `JsonWebTokenError`) {
    status = 401;
    message = `Invalid Token`;
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
  } else if (
    err.ApiResponse.status_message ==
    "The request could not be completed due to a conflict with the current state of the target resource, please try again"
  ) {
    status = 406;
    message = err.ApiResponse.status_message;
  } else if (err.name == `upload_error`) {
    status = 500;
    message = "Failed to upload image";
  }
  res.status(status).json({ message });
};

module.exports = errorHandler;
