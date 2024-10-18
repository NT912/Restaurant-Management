const db = require("../config/db");

const User = {
  findByEmail: (email, callback) => {
    db.query("SELECT * FROM Accounts WHERE email = ?", [email], callback);
  },
  
  create: (user) => {
    const { email, password, phone_number } = user;
    db.query(
      "INSERT INTO Accounts (email, password, phone_number) VALUES (?, ?, ?)",
      [email, password, phone_number],
      callback
    );
  },

  findByEmail: (email, callback) => {
    db.query("SELECT * FROM Accounts WHERE email = ?", [email], callback);
  },
  create: (user, callback) => {
    const { email, password, phone_number } = user;
    db.query(
      "INSERT INTO Accounts (email, password, phone_number) VALUES (?, ?, ?)",
      [email, password, phone_number],
      callback
    );
  },
};

module.exports = User;
