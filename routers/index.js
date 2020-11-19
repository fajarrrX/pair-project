const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/", Controller.home);

router.get("/login", Controller.login);

router.get("/guesthouses", Controller.guestHouse);
router.get("/guesthouses/add", Controller.addForm);
router.post("/guesthouses/add", Controller.addGuestHouse);

router.get("/guesthousereservation", Controller.showReservation);
router.get("/guesthousereservation/:id", Controller.updateReservation);
router.post("/guesthousereservation/:id", Controller.postUpdateReservation);

router.get("/guesthousereservation/delete/:id", Controller.CancelReservation);

module.exports = router;

//CRUD CREATE READ UPDATE DELETE
