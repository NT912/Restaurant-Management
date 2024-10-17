const Reservation = require("../models/reservationModel");

exports.createReservation = (req, res) => {
  const reservation = req.body;

  Reservation.create(reservation, (err, result) => {
    if (err)
      return res.status(500).json({ message: "Error creating reservation" });
    res.status(201).json({
      message: "Reservation created successfully",
      reservation: result,
    });
  });
};
