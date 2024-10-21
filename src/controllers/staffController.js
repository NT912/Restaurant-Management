const StaffModel = require("../models/staffModel")
const DeparmentModel = require("../models/departmentModel")

const staffController = {
  findByName: async (req, res) => {
    try {
      const name = req.query.name;
      const departmentID = req.query.department;
      const roleID = req.query.role;

      const staffs = await StaffModel.findByName(name, departmentID, roleID);
      res.json(staffs);
    } catch(err) {
      console.log(err);
    }
  }
};

module.exports = staffController;
