const express = require("express");
const authController = require("../controllers/authController");
const staffController = require("../controllers/staffController");
const router = express.Router();

router.get("/staff", staffController.findByName)

router.get("/staff/update", staffController.findByName)

module.exports = router;
