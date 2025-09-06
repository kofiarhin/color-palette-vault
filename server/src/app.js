const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);

app.get("/", (req, res, next) => {
  return res.json({ message: "hello world" });
});

module.exports = app;
