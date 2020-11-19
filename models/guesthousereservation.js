"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GuestHouseReservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GuestHouseReservation.init(
    {
      GuestId: DataTypes.INTEGER,
      GuestHouseId: DataTypes.INTEGER,
      start_date: DataTypes.DATEONLY,
      end_date: DataTypes.DATEONLY,
      reservation_status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "GuestHouseReservation",
    }
  );
  return GuestHouseReservation;
};
