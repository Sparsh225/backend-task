// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });
      res.status(200).json({ token });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
