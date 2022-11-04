const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: `invalid token` };

    const payload = verifyToken(access_token);

    const user = await User.findOne({
      where: {
        id: payload.id,
      },
    });
    if (!user) throw { name: `invalid token` };

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
