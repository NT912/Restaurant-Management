const express = require("express");
const departmentController = require("../controllers/departmentController");
const router = express.Router();

router.get('/getDepartmentByRole/:roleId', departmentController.getDepartmentByRoleID);

module.exports = router;
