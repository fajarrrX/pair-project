const { GuestHouse, Guest, GuestHouseReservation } = require("../models");

class Controller {
  static register(req, res){
    res.render('register')
  }
  static registerPost(req, res){
    const obj = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    Guest.create(obj)
      .then(data =>{
        res.redirect('/')
      })
      .catch(err => {
        res.send(err)
      })
  }
  static login(req, res) {
    res.send("login");
  }
  static loginPost(req, res){
    Guest.findOne({ where: { username: req.body.username}})
      .then(data => {
        req.session.id = data.id
        req.session.username = data.username
        res.redirect('/')
      })
      .catch(err => {
        res.send(err)
      })
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
