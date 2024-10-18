const express = require("express");
const adminController = require("../../controllers/panelController/adminController");

const router = express.Router();

router.get("/admin-panel", adminController.getPanel);

module.exports = router;
