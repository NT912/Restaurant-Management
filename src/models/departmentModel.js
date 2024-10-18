const db = require("../config/db");

const deparmentModel = {
  findByUserName: (userNam) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM staff WHERE userName = ?`;
      db.query(query, [userNam], (err, result) => {
        if (err) return reject(err);
        resolve(result[0]);
      });
    })
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
