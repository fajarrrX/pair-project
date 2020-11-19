const { GuestHouse, Guest, GuestHouseReservation } = require("../models");
const { comparePassword } = require("../helpers/password");
const moment = require("moment");

class Controller {
  static home(req, res) {
    console.log(req.session.userId);
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
    const password = req.body.password;

    Guest.findOne({
      where: {
        username: username,
      },
    })
      .then((user) => {
        if (user && comparePassword(password, user.password)) {
          req.session.userId = user.id;
          res.redirect("/");
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
    GuestHouse.findAll({
      include: [
        {
          model: Guest,
        },
      ],
    })
      .then((data) => {
        res.render("bookform", { data });
        console.log(data);
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
  static addReservation(req, res) {
    const id = req.params.id;
    let day = req.body.start_date;
    const newData = {
      GuestId: req.body.guest,
      GuestHouseId: id,
      start_date: day,
      end_date: moment(day).add(7, "days"),
    };
    GuestHouseReservation.create(newData)
      .then((data) => {
        res.redirect("/guesthousereservation");
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static showReservation(req, res) {
    GuestHouseReservation.findAll()
      .then((data) => {
        res.render("guesthouseres", { data });
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
  static updateReservation(req, res) {
    const id = req.params.id;

    GuestHouseReservation.findByPk(id)
      .then((data) => {
        res.render("edit", { data });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static postUpdateReservation(req, res) {
    const id = req.params.id;
    const updatedData = {};
    GuestHouseReservation.update(updatedData, {
      where: {
        id: id,
      },
    })
      .then((data) => {
        res.redirect("");
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static CancelReservation(req, res) {
    const id = req.params.id;

    GuestHouseReservation.destroy({
      where: {
        id: id,
      },
    })
      .then((data) => {
        res.redirect("");
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = Controller;
