const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const panelRoute = require("./panelRoute/adminRoute");
const router = express.Router();

router.use("/panel", panelRoute);

router.get("/", dashboardController.getDashboard);

module.exports = router;
