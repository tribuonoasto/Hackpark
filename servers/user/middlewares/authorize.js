const authorize = async (req, res, next) => {
  try {
    const { isRegis } = req.user;

    if (isRegis === false) throw { name: "Forbidden" };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorize;
