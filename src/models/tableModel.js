const db = require("../config/db");

const Table = {
  findAll: (callback) => {
    db.query("SELECT * FROM Restaurant_Tables", callback);
  },
  findAvailable: (date, time, callback) => {
    db.query(
      "SELECT * FROM Restaurant_Tables WHERE table_id NOT IN (SELECT table_id FROM Reservations WHERE reservation_date = ? AND reservation_time = ?)",
      [date, time],
      callback
    );
  },
};

module.exports = Table;
