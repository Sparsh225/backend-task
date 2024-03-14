// routes/postRoutes.js

const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.post("/", async (req, res) => {
  try {
    const { title, body, geolocation } = req.body;
    const newPost = new Post({
      title,
      body,
      createdBy: req.user._id,
      geolocation,
    });
    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Implement other CRUD operations (GET, PUT, DELETE) for posts here

module.exports = router;
