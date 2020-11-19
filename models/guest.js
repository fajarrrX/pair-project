"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/password");

module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Guest.belongsToMany(models.GuestHouse, {
        through: models.GuestHouseReservation,
      });
    }
  }
  Guest.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          instance.password = hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: "Guest",
    }
  );
  return Guest;
};
