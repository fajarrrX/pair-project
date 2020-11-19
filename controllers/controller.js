const { GuestHouse, Guest, GuestHouseReservation } = require("../models");
const { comparePassword } = require("../helpers/password");

class Controller {
  static home(req, res) {
    res.render("home");
  }
  static register(req, res) {
    res.render("register");
  }
  static registerPost(req, res) {
    const obj = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    Guest.create(obj)
      .then((_) => {
        res.redirect("/");
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
  static login(req, res) {
    res.render("login");
  }
  static loginPost(req, res) {
    const username = req.body.username;
    const password = req.body.username;

    Guest.findOne({
      where: {
        username: username,
      },
    })
      .then((user) => {
        if (user && comparePassword(password, user.password)) {
          res.send(`welcome ${user.name}`);
        } else {
          res.send(`invalid username or password`);
        }
      })
      .catch((err) => {
        res.send(err.message);
      });
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
  static addForm(req, res) {
    let id = req.params.id;
    GuestHouseReservation.findAll()
      .then((data) => {
        res.render("addForm", { data });
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
  static postAdd(req, res) {}
  static showReservation(req, res) {}
  static updateReservation(req, res) {}
  static postUpdateReservation(req, res) {}
  static CancelReservation(req, res) {}
}

module.exports = Controller;
