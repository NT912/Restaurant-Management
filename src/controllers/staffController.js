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
  },
  createStaff: async (req, res) => {
    const { name, username, roleId, phone, password } = req.body;

    if (!name || !username || !roleId || !password) {
      return res.status(400).json({ message: 'Please fill out!' });
    }

    try {
        await StaffModel.createStaff(name, username, roleId, phone, password,
        );

        return res.status(200).json({ message: 'Account created successfully!' });
    } catch (error) {
        console.error('Error creating account:', error);
        return res.status(500).json({ message: 'Failed to create account.' });
    }
  },

  updateStaff: async (req, res) => {
    try {
      const { id, name, roleId, phone } = req.body;

      if (!id || !name || !roleId) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const result = await StaffModel.updateStaff(id, name, roleId, phone);

      if (result.affectedRows > 0) {
        res.json({ message: 'Employee updated successfully' });
      } else {
        res.status(404).json({ message: 'Employee not found or not updated' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error updating employee data' });
    }
  },

  deleteStaff: async (req, res) => {
    try {
      const { accountId } = req.body;
      if (!accountId) {
          return res.status(400).json({ message: 'Staff ID is required' });
      }

      const result = await StaffModel.deleteById(accountId);

      if (result.affectedRows > 0) {
          res.json({ message: 'Account deleted successfully' });
      } else {
          console.error(err);

          res.status(404).json({ message: 'Account not found' });
      }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting account' });
    }
  }
};

module.exports = staffController;
