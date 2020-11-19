"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("GuestHouseReservations", {
      fields: ["GuestId"],
      type: "foreign key",
      name: "adding-guestId-fk-to-GuestHouseReservation",
      references: {
        //Required field
        table: "Guests",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "GuestHouseReservations",
      "adding-guestId-fk-to-GuestHouseReservation",
      {}
    );
  },
};
