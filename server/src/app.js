const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const paletteData = require("./data/colorData.json");

const app = express();

app.use(
  cors({
    // If your client is Vite, it's usually http://localhost:5173
    origin: ["http://localhost:4000", "https://color-palette-vault.vercel.app"],
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);

app.get("/", (req, res) => {
  return res.json({ message: "hello world" });
});

app.get("/api/palettes", async (req, res) => {
  // fixed stray 'l' and invalid JSON
  return res.json(paletteData);
});

module.exports = app;
