const express = require("express");
const reservationController = require("../controllers/reservationController");
const router = express.Router();

router.post("/create", reservationController.createReservation);

module.exports = router;
