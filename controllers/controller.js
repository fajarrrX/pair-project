const { GuestHouse, Guest, GuestHouseReservation } = require("../models");

class Controller {
  static home(req, res) {
    res.render("home");
  }
  static login(req, res) {
    res.send("inilogin");
  }
  static guestHouse(req, res) {
    GuestHouse.findAll()
      .then((data) => {
        res.render("guesthouses", { data });
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
  static addForm(req, res) {}
  static addGuestHouse(req, res) {}
  static showReservation(req, res) {}
  static updateReservation(req, res) {}
  static postUpdateReservation(req, res) {}
  static CancelReservation(req, res) {}
}

module.exports = Controller;
