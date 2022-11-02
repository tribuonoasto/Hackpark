"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: {
          name: true,
          msg: "username is already use",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "username is required",
          },
          notEmpty: {
            msg: "username is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          name: true,
          msg: "username is already use",
        },
        allowNull: false,
        validate: {
          isEmail: {
            msg: "use email format!",
          },
          notNull: {
            msg: "email is required",
          },
          notEmpty: {
            msg: "email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5],
            msg: "password minimum character is 5",
          },
          notNull: {
            msg: `password is required`,
          },
          notEmpty: {
            msg: `password is required`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((el) => (el.password = hash(el.password)));
  return User;
};
