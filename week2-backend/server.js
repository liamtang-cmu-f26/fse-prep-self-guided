const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

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