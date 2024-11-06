const db = require("../config/db");

const roleModel = {
  getAllRole: () => {
    return new Promise((resolve, reject) => {
      const query = ` 
        SELECT * from role WHERE role.Name != 'Admin'
        `;
      db.query(query, (err, result) => {
        if (err) return reject(err);
        resolve(result); 
      });
    });
  }
};

module.exports = roleModel;
