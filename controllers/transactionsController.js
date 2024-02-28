const express = require("express");

const transactions = express.Router();

const transactionsArray = require("../models/transactions.models");

transactions.get("/", (req, res) => {
  res.json({ transactions: transactionsArray });
});

module.exports = transactions;
