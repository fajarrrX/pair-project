"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GuestHouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GuestHouse.belongsToMany(models.Guest, {
        through: models.GuestHouseReservation,
      });
    }
  }
  GuestHouse.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      capacity: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "GuestHouse",
    }
  );
  return GuestHouse;
};