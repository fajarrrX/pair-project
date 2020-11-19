const { GuestHouse, Guest, GuestHouseReservation } = require("../models");
const moment = require('moment')

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
  static addForm(req, res) {
    const id = req.params.id
    let guests
    Guest.findAll()
      .then((data) => {
        guests = data;
        return GuestHouseReservation.findByPk(id, {
          include: [Guest, GuestHouse]
        })
      })
      .then((data) => {
        res.render('bookform', {Guest, data})
      })
      .catch((err) => {
        res.send(err)
      })
  }
  static addReservation(req, res) {
    const id = req.params.id
    let day = req.body.start_date
    const newData = {
      GuestId: req.body.guest,
      GuestHouseId: id,
      start_date: day,
      end_date: moment(day).add(7, "days")
    }
    GuestHouseReservation.create(newData)
      .then((data) => {
        res.redirect('/guesthousereservation')
      })
      .catch((err) => {
        res.send(err)
      })
  }
  static showReservation(req, res) {
    GuestHouseReservation.findAll({
      order: [['id', 'DESC']]
    })
    .then(data => {
      res.render('guesthouseres', {objData: data})
    })
    .catch(err => {
      res.send(err)
    })
  }
  static updateReservation(req, res) {
    const id = req.params.id

    GuestHouseReservation.findByPk(id)
      .then((data) => {
        res.render('', { data })
      })
      .catch((err) => {
        res.send(err)
      })
  }
  static postUpdateReservation(req, res) {
    const id = req.params.id
    const updatedData = {

    }
    GuestHouseReservation.update(updatedData, {
      where: {
        id: id,
      }
    })
      .then((data) => {
        res.redirect('')
      })
      .catch((err) => {
        res.send(err)
      })
  }
  static CancelReservation(req, res) {
    const id = req.params.id

    GuestHouseReservation.destroy({
      where: {
        id: id
      }
    })
      .then((data) => {
        res.redirect('')
      })
      .catch((err) => {
        res.send(err)
      })
  }
}

module.exports = Controller;
