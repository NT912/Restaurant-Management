const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");
const path = require("path");

const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const tableRoutes = require("./routes/tableRoutes");

const app = express();

// Set view engine
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route for dashboard
app.get("/dashboard", (req, res) => {
  console.log("Here in the dashboard route");
  res.render("dashboard", { title: "Dashboard" });
});

// Other routes
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/tables", tableRoutes);

// Start server
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
