"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("GuestHouses", [
      {
        name: "Mawar Guest House",
        location: "Bandung",
        price: 200000,
        description:
          "GuestHouse ini terletak di kota bandung dan memeliki beberapa fasilitas unggulan seperti AC, breaksfast dan kolam renang",
        capacity: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Melati Guest House",
        location: "Jakarta",
        price: 300000,
        description:
          "GuestHouse ini terletak di kota jakarta dan memeliki beberapa fasilitas unggulan seperti AC, breaksfast dan kolam renang",
        capacity: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tulip Guest House",
        location: "Yogyakarta",
        price: 150000,
        description:
          "GuestHouse ini terletak di kota yogyakarta dan memeliki beberapa fasilitas unggulan seperti AC, breaksfast dan kolam renang",
        capacity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Anggrek Guest House",
        location: "Surabaya",
        price: 200000,
        description:
          "GuestHouse ini terletak di kota surabaya dan memeliki beberapa fasilitas unggulan seperti AC, breaksfast dan kolam renang",
        capacity: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("GuestHouses", null, {});
  },
};
