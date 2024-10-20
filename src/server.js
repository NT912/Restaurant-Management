const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");
const path = require("path");

const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const tableRoutes = require("./routes/tableRoutes");
const finaceRoute = require("./routes/financeRoute");

const app = express();

// Set view engine
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');

// Cấu hình express-session
app.use(session({
  secret: 'yourSecretKey',  // Một chuỗi bảo mật cho việc mã hóa session
  resave: false,            // Không lưu session nếu không thay đổi
  saveUninitialized: true,  // Lưu session mới dù chưa có dữ liệu
  cookie: { secure: false } // Nếu bạn không sử dụng HTTPS, cần để `secure: false`
}));


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/dashboard", dashboardRoutes);
app.use("/auth", authRoutes);

// Other routes
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/finance", finaceRoute);

// Start server
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
