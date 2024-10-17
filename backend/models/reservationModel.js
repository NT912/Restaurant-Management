const db = require("../config/db");

const Reservation = {
  create: (reservation, callback) => {
    const {
      customer_name,
      table_id,
      reservation_time,
      reservation_date,
      head_count,
      special_request,
    } = reservation;
    db.query(
      "INSERT INTO Reservations (customer_name, table_id, reservation_time, reservation_date, head_count, special_request) VALUES (?, ?, ?, ?, ?, ?)",
      [
        customer_name,
        table_id,
        reservation_time,
        reservation_date,
        head_count,
        special_request,
      ],
      callback
    );
  },
  findByDate: (date, callback) => {
    db.query(
      "SELECT * FROM Reservations WHERE reservation_date = ?",
      [date],
      callback
    );
  },
};

module.exports = Reservation;
