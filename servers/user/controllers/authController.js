const { compare } = require("../helpers/bcrypt");
const env = require("../helpers/env");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");
const axios = require("axios");

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
      const { username, email, password, fullName } = req.body;

      const valid = await axios({
        method: "get",
        url: `https://emailvalidation.abstractapi.com/v1/`,
        params: {
          api_key: env.AbstractKey,
          email: email,
        },
      });

      if (valid.data.is_smtp_valid.value === false) {
        throw { name: `invalid_email` };
      } else if (valid.data.is_smtp_valid.value == true) {
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
          if (err) {
            return console.log(err);
          } else {
            return console.log("success");
          }
        });

        await User.create({
          username,
          email,
          password,
          fullName,
        });

        res.status(201).json({ message: "Check your email" });
      }
    } catch (err) {
      next(err);
    }
  }
}
module.exports = Controller;
