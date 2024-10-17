const express = require("express");
const tableController = require("../controllers/tableController");
const router = express.Router();

router.get("/available", tableController.getAvailableTables);

module.exports = router;
