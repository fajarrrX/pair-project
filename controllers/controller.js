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
  static showReservation(req, res) {
    GuestHouseReservation.findAll()
      .then((data) => {
        // console.log(data);
        res.render("guesthouseres", { data });
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
  static addForm(req, res) {
    let guesthouse = null;

    GuestHouse.findAll()
      .then((data) => {
        guesthouse = data;
        return Guest.findAll();
      })
      .then((data) => {
        // console.log(data);
        // res.send({data, guesthouse});
        res.render("bookform", { data, guesthouse });
      })

      .catch((err) => {
        res.send(err.message);
      });
    // let id = req.params.id;

    // GuestHouse.findByPk(id, {
    //   include: [Guest],
    // })
    //   .then((data) => {
    //     res.send(data);
    //   })
    //   .catch((err) => {
    //     res.send(err.message);
    //   });
  }
  static addReservation(req, res) {
    // const id = req.params.id;

    const newData = {
      GuestId: req.body.GuestId,
      GuestHouseId: req.body.GuestHouseId,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      reservation_status: true,
    };
    GuestHouseReservation.create(newData)
      .then((data) => {
        res.redirect("/guesthousereservation");
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static updateReservation(req, res) {
    let id = req.params.id;

    GuestHouse.findByPk(id)
      .then((data) => {
        const newCapacity = data.capacity - 1;
        return GuestHouse.update(
          {
            capacity: newCapacity,
          },
          {
            where: {
              id: id,
            },
          }
        );
      })
      .then((_) => {
        res.redirect("/guesthouses");
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
  static CancelReservation(req, res) {
    const id = req.params.id;

    GuestHouseReservation.destroy({
      where: {
        id: id,
      },
    })
      .then((_) => {
        res.redirect("/");
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
}

module.exports = Controller;
