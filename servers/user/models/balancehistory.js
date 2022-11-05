"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BalanceHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BalanceHistory.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  BalanceHistory.init(
    {
      UserId: DataTypes.INTEGER,
      dateTransaction: DataTypes.DATE,
      type: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BalanceHistory",
    }
  );
  BalanceHistory.beforeCreate((el) => (el.dateTransaction = new Date()));
  return BalanceHistory;
};
