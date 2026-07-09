require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

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

app.post("/api/register", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password are required"
    });
  }

  res.status(201).json({
    message: "User received",
    user: {
      username: username
    }
  });
});

app.get("/", function (req, res) {
  res.send("Hello from backend");
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
