const StaffModel = require("../../models/staffModel")
const roleModel = require("../../models/roleModel")
const DeparmentModel = require("../../models/departmentModel")
const FinanceModel = require("../../models/financeModel")

const adminController = {
  getPanel: async (req, res) => {
    try {
      const panel = req.query.name || 'main'; 

      if (panel === 'account') {
        const employees = await StaffModel.getAllStaff();
        const departments = await DeparmentModel.getAllAparment();
        const roles = await roleModel.getAllRole();
        res.render('panel/admin/admin', { employees: employees, panel: 'account', departments: departments, roles: roles});
      } else 
      if (panel === 'main') {
        const date = req.query.date; 

        const revenue = await FinanceModel.calculateDayRevenueCustomer(date)
        res.render('panel/admin/admin', { employees: employees, panel: 'main', revenue: revenue});
      }
      
    } catch(err) {
      console.log(err);
    }
  }



};

module.exports = adminController;
