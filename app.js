const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const transactionsController = require("./controllers/transactionsController");

app.use("/transactions", transactionsController);

app.get("/", (req, res) => {
  res.send("Welcome to the Budgtr App!");
});

module.exports = app;
