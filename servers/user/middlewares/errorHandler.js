const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";

  if (
    err.name == `SequelizeValidationError` ||
    err.name == `SequelizeUniqueConstraintError`
  ) {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name == "User not found") {
    status = 404;
    message = "User not found";
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
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;