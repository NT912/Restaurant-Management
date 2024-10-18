const express = require("express");
const sttaffController = require("../../controllers/staffController");

const router = express.Router();

router.get("/findStaff", authController.signup);

module.exports = router;
