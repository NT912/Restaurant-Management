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

  findByName: (Name, departmentID, roleID) => {
    return new Promise((resolve, reject) => {
      let query = `
        SELECT s.Name, r.Name as roleName, d.Name as departmentName, s.PhoneNumber, d.Icon as departmentIcon
        FROM staff s
        JOIN role r ON s.RoleID = r.RoleID
        JOIN department d ON r.DepartmentID = d.DepartmentID
        WHERE 1 = 1
      `;
      
      const params = [];
  
      if (Name) {
        query += ` AND s.Name LIKE ?`;
        params.push(`%${Name}%`); 
      }
  
      if (departmentID) {
        query += ` AND d.DepartmentID = ?`;
        params.push(departmentID);
      }
  
      if (roleID) {
        query += ` AND r.RoleID = ?`;
        params.push(roleID); 
      }
  
      db.query(query, params, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  getAllStaff: () => {
    return new Promise((resolve, reject) => {
      const query = ` 
        SELECT s.StaffID, s.Name, r.Name as roleName, r.RoleID, d.Name as departmentName, d.DepartmentID, d.Icon as departmentIcon, s.PhoneNumber
        FROM staff s
        JOIN role r ON s.RoleID = r.RoleID
        JOIN department d ON r.DepartmentID = d.DepartmentID
        `;
      db.query(query, (err, result) => {
        if (err) return reject(err);
        resolve(result); 
      });
    });
  }
};

module.exports = StaffModel;
