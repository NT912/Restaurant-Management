const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// Signup function
exports.signup = (req, res) => {
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
};

// Login function
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, user) => {
    if (!user.length)
      return res.status(404).json({ message: "User not found" });

    bcrypt.compare(password, user[0].password, (err, isMatch) => {
      if (!isMatch)
        return res.status(400).json({ message: "Invalid password" });
      res.status(200).json({ message: "Login successful", user: user[0] });
    });
  });
};
