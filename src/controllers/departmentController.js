const departmentModel = require("../models/departmentModel")

const departmentController = {
  getDepartmentByRoleID: async (req,res) => {
    try {
      const { roleId } = req.params;

      const departments = await departmentModel.findByRoleId(roleId);

      res.json(departments);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching departments', error });
  }
  }
};

module.exports = departmentController;
