const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";

  if (err.name === "invalid_validation") {
    code = 400;
    message = err.msg;
  } else if (err.name === "user_not_found") {
    code = 404;
    message = "User Not Found";
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
