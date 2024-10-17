const Table = require("../models/tableModel");

exports.getAvailableTables = (req, res) => {
  const { date, time } = req.query;

  Table.findAvailable(date, time, (err, tables) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching available tables" });
    res.status(200).json(tables);
  });
};
