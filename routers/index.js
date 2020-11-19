const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/", Controller.home);

router.get("/login", Controller.login);

router.get("/guesthouses", Controller.guestHouse);
router.get("/guesthousereservation/add", Controller.addForm);
router.post("/guesthousereservation/add", Controller.postAdd);

router.get("/guesthousereservation", Controller.showReservation);
router.get("/guesthousereservation/:id", Controller.updateReservation);
router.post("/guesthousereservation/:id", Controller.postUpdateReservation);

router.get("/guesthousereservation/delete/:id", Controller.CancelReservation);

module.exports = router;

//CRUD CREATE READ UPDATE DELETE
