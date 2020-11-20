"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("GuestHouseReservations", {
      fields: ["GuestHouseId"],
      type: "foreign key",
      name: "adding-guestHouseId-fk-to-GuestHouseReservation",
      references: {
        //Required field
        table: "GuestHouses",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "GuestHouseReservations",
      "adding-guestHouseId-fk-to-GuestHouseReservation",
      {}
    );
  },
};
