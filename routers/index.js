const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

const isLogin = function (req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/login");
  }
};

const DoubleLoginHandler = function (req, res, next) {
  if (req.session.userId) {
    res.redirect("/");
  } else {
    next();
  }
};
router.get("/", Controller.home);
router.get("/register", DoubleLoginHandler, Controller.register);
router.post("/register", DoubleLoginHandler, Controller.registerPost);
router.get("/login", DoubleLoginHandler, Controller.login);
router.post("/login", DoubleLoginHandler, Controller.loginPost);

router.use(isLogin);

router.get("/guesthouses", Controller.guestHouse);
router.get("/guesthousereservation", Controller.showReservation);
router.get("/guesthousereservation/add", Controller.addForm);
router.post("/guesthousereservation/add", Controller.addReservation);

router.get("/guesthousereservation/:id/booking", Controller.updateReservation);

router.get("/guesthousereservation/:id/delete", Controller.CancelReservation);

module.exports = router;
