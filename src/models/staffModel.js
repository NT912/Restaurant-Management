const db = require("../config/db");

const StaffModel = {
  findByNameLogin: (Name) => {
    return new Promise((resolve, reject) => {
      let query = `
        SELECT s.Password
        FROM staff s
        WHERE s.username = ?
      `;
  
      const params = [Name]; 
  
      db.query(query, params, (err, result) => {
        if (err) return reject(err);
        resolve(result[0]);
      });
    });
  },

  createStaff: (Name, username, RoleID, PhoneNumber, Password) => {
      return new Promise((resolve, reject) => {
          const query = `
              INSERT INTO staff (Name, username, RoleID, PhoneNumber, Password) 
              VALUES (?, ?, ?, ?, ?)
          `;

          db.query(query, [Name, username, RoleID, PhoneNumber, Password], (err, result) => {
              if (err) return reject(err);
              resolve(result);
          });
      });
  },
  
  updateStaff: (id, name, roleId, phone) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE staff 
        SET Name = ?, RoleID = ?, PhoneNumber = ?
        WHERE StaffID = ?
      `;
      const params = [name, roleId, phone, id];

      db.query(query, params, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  deleteById: (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM staff WHERE StaffID = ?';
        db.query(query, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
  },

  findByName: (Name, departmentID, roleID) => {
    return new Promise((resolve, reject) => {
      let query = `
        SELECT s.StaffID, s.Name, r.Name as roleName, s.Status, r.RoleID, d.Name as departmentName, d.DepartmentID, d.Icon as departmentIcon, s.PhoneNumber
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
        SELECT s.StaffID, s.Name, r.Name as roleName, s.Status, r.RoleID, d.Name as departmentName, d.DepartmentID, d.Icon as departmentIcon, s.PhoneNumber
        FROM staff s
        JOIN role r ON s.RoleID = r.RoleID
        JOIN department d ON r.DepartmentID = d.DepartmentID
        WHERE r.Name != 'Admin'
        `;
      db.query(query, (err, result) => {
        if (err) return reject(err);
        resolve(result); 
      });
    });
  }
};

module.exports = StaffModel;
