"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("GuestHouseReservations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      GuestId: {
        type: Sequelize.INTEGER,
      },
      GuestHouseId: {
        type: Sequelize.INTEGER,
      },
      start_date: {
        type: Sequelize.DATEONLY,
      },
      end_date: {
        type: Sequelize.DATEONLY,
      },
      reservation_status: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("GuestHouseReservations");
  },
};
