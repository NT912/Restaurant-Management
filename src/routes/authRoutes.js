const express = require("express");
const authController = require("../controllers/authController");
const staffController = require("../controllers/staffController");
const router = express.Router();

router.get("/login", authController.getlogin)
router.post("/login", authController.login)

router.get("/staff", staffController.findByName)

router.post("/staff/create", staffController.createStaff)
router.post("/staff/update", staffController.updateStaff)
router.post("/staff/delete", staffController.deleteStaff)

module.exports = router;
