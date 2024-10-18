const bcrypt = require("bcrypt");
const StaffModel = require("../models/staffModel");

const authController = {
  signup: async(req, res) => {
  const { email, password, phone_number } = req.body;

  User.findByEmail(email, (err, user) => {
    if (user.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err)
        return res.status(500).json({ message: "Error hashing password" });

      const newUser = { email, password: hashedPassword, phone_number };
      User.create(newUser, (err, result) => {
        if (err)
          return res.status(500).json({ message: "Error creating user" });
        res.status(201).json({ message: "User registered successfully" });
      });
    });
  });
},

getlogin: (req, res) => {
  const userSession = req.session.user;
  if (userSession) {
    return res.render('dashboard', { title: "Dashboard" });
  }

  res.render("login/login", { title: "Dashboard" });
},

login: async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await StaffModel.findByUserName(userName);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== user.Password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    req.session.user = {
      id: user.StaffID,
      userName: user.Name
    };

    res.status(200).json({ message: "Login successful", user });

    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: "Server error", error });
    }
  }
};

module.exports = authController;
