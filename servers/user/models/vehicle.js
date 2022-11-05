"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicle.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  Vehicle.init(
    {
      UserId: DataTypes.INTEGER,
      plat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "plat is required",
          },
          notEmpty: {
            msg: "plat is required",
          },
        },
      },
      modelName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "model name is required",
          },
          notEmpty: {
            msg: "model name is required",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "name is required",
          },
          notEmpty: {
            msg: "name is required",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "Vehicle",
    }
  );
  return Vehicle;
};
