const express = require("express");
const financeController = require("../controllers/fincanceController");
const router = express.Router();

router.get("/chart", financeController.financeDaily);

module.exports = router;
