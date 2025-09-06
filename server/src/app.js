const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "https://color-palette-vault.vercel.app/",
    ],
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);

app.get("/", (req, res, next) => {
  return res.json({ message: "hello world" });
});

module.exports = app;
