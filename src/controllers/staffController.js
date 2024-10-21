const StaffModel = require("../models/staffModel")
const DeparmentModel = require("../models/departmentModel")

const staffController = {
  findByName: async (req, res) => {
    try {
      console.log("heree");
      const name = req.query.name ? `%${req.query.name}%` : '%';
      const department = req.query.department ? req.query.department : '%';

      const staffs = StaffModel.findByName(name, department);
      res.json(staffs);
    } catch(err) {
      console.log(err);
    }
  }
};

module.exports = staffController;
