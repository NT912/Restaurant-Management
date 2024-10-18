const StaffModel = require("../../models/staffModel")
const roleModel = require("../../models/roleModel")
const DeparmentModel = require("../../models/departmentModel")

const adminController = {
  getPanel: async (req, res) => {
    try {
      const employees = await StaffModel.getAllStaff();
      const departments = await DeparmentModel.getAllAparment();
      const roles = await roleModel.getAllRole();

      res.render('panel/adminPanel', { employees: employees, panel: 'account', departments: departments, roles: roles});
    } catch(err) {
      console.log(err);
    }
  }
};

module.exports = adminController;
