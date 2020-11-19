const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/", (req, res) =>{
    console.log(req.session)
    if(!req.session.count){
        req.session.count = 1
    }else{
        req.session.count++
    }
    res.render('home', {count: req.session.count, key: req.session.key})
});

router.get("/register", Controller.register)
router.get("/register", Controller.registerPost)

router.get("/login", Controller.login);
router.post("/login", Controller.loginPost)

router.get("/guesthouses", Controller.guestHouse);
router.get("/guesthouses/add", Controller.addForm);
router.post("/guesthouses/add", Controller.addReservation);

router.get("/guesthousereservation", Controller.showReservation);
router.get("/guesthousereservation/:id", Controller.updateReservation);
router.post("/guesthousereservation/:id", Controller.postUpdateReservation);

router.get("/guesthousereservation/delete/:id", Controller.CancelReservation);

module.exports = router;