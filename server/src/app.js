const express = require("express");
const colorData = require("./data/colorData.json");
const cors = require("cors");

const app = express();

// setup middleware
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);

app.get("/", async (req, res, next) => {
  return res.json({ message: "hello world" });
});

app.use("/api/palettes", async (req, res, next) => {
  return res.json(colorData);
});
app.use("/api/auth/me", async (req, res, next) => {
  return res.json({ message: "get user profile" });
});

module.exports = app;
