"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("GuestHouseReservations", {
      fields: ["guestHouseId"],
      type: "foreign key",
      name: "adding-guestHouseId-fk-to-GuestHouseReservation",
      references: {
        //Required field
        table: "GuestHouses",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
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
