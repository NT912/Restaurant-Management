const db = require("../config/db");

const StaffModel = {
  findByUserName: (userNam) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM staff WHERE userName = ?`;
      db.query(query, [userNam], (err, result) => {
        if (err) return reject(err);
        resolve(result[0]);
      });
    })
  },

  findByName: (Name, department) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT s.Name, r.Name as roleName, d.Name as departmentName, s.PhoneNumber, d.Icon as departmentIcon
        FROM staff s
        JOIN role r ON s.RoleID = r.RoleID
        JOIN department d ON r.DepartmentID = d.DepartmentID
        WHERE s.Name LIKE ? AND d.Name LIKE ? 
    `;
      db.query(query, [Name, department], (err, result) => {
        if (err) return reject(err);
        resolve(result[0]);
      });
    })
  },

  getAllStaff: () => {
    return new Promise((resolve, reject) => {
      const query = ` 
        SELECT s.Name, r.Name as roleName, d.Name as departmentName, d.Icon as departmentIcon, s.PhoneNumber
        FROM staff s
        JOIN role r ON s.RoleID = r.RoleID
        JOIN department d ON r.DepartmentID = d.DepartmentID
        `;
      db.query(query, (err, result) => {
        if (err) return reject(err);
        resolve(result); // Trả về tất cả các nhân viên
      });
    });
  }
};

module.exports = StaffModel;
