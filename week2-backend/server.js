require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;
const User = require("./models/User");

app.use(express.json());
app.use(express.static("public"));

mongoose
    .connect(process.env.MONGO_URI)
    .then(function () {
        console.log("Connected to MongoDB");
    })
    .catch(function (error) {
        console.error("MongoDB connection error:", error);
    });

app.post("/api/register", async function (req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required"
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters"
      });
    }

    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res.status(409).json({
        error: "Username already exists"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
    username: username,
    passwordHash: passwordHash
    });

    res.status(201).json({
      message: "User created",
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error"
    });
  }
});

app.get("/api/health", function (req, res) {
  res.json({
    status: "ok",
    message: "Backend is running"
  });
});

app.get("/api/users", function (req, res) {
  res.json([
    { id: 1, username: "liam" },
    { id: 2, username: "cmusv" }
  ]);
});

app.listen(PORT, function () {
  console.log(`Server running on http://localhost:${PORT}`);
});
