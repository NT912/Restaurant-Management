const db = require("../config/db");

const deparmentModel = {
  findByRoleId: (roleId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT d.DepartmentID, d.Name 
            FROM department d
            JOIN role r ON d.DepartmentID = r.DepartmentID
            WHERE r.RoleID = ?;
        `;
        db.query(query, [roleId], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        });
    });
  },

  getAllAparment: () => {
    return new Promise((resolve, reject) => {
      const query = ` 
        SELECT * from department
        `;
      db.query(query, (err, result) => {
        if (err) return reject(err);
        resolve(result); 
      });
    });
  }
};

module.exports = deparmentModel;
