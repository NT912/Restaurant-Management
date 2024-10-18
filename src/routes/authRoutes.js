const express = require("express");
const authController = require("../controllers/authController");

const validateLogin = require("../validatior/authValidator");
const router = express.Router();

router.post("/signup", authController.signup);

router.get("/login", authController.getlogin);
router.post('/login', validateLogin.validateLogin, authController.login);

module.exports = router;
