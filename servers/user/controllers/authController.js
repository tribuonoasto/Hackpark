const { compare } = require("../helpers/bcrypt");
const env = require("../helpers/env");
const { createToken } = require("../helpers/jwt");
const { sequelize } = require("../models");
const { User } = require("../models");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (!user) throw { name: "invalid_credentials" };

      const validate = compare(password, user.password);

      if (!validate) throw { name: "invalid_credentials" };

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      const access_token = createToken(payload);

      res.status(200).json({
        access_token,
        id: payload.id,
        username: payload.username,
        email: payload.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const nodemailer = require("nodemailer");

      const transporter = nodemailer.createTransport({
        host: env.host,
        port: env.port,
        auth: {
          user: env.user,
          pass: env.pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOption = {
        from: `nodemailer`,
        to: email,
        subject: `Verification`,
        text: `send email`,
      };

      transporter.sendMail(mailOption, (err, info) => {
        if (err) throw { name: "email not send" };
        User.create({
          username,
          email,
          password,
        })
          .then(() => {
            res.status(201).json({ message: `Success register` });
          })
          .catch((err) => {
            throw err;
          });
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = Controller;
