const express = require("express");

const transactions = express.Router();

let transactionsArray = require("../models/transactions.models");

transactions.get("/", (req, res) => {
  res.json({ transactions: transactionsArray });
});

transactions.post("/", (req, res) => {
  const newId = transactionsArray[transactionsArray.length - 1].id + 1;
  req.body.id = newId;
  transactionsArray.push(req.body);
  res.json({ transactions: transactionsArray });
});

transactions.get("/:id", (req, res) => {
  const { id } = req.params;
  const index = transactionsArray.findIndex(
    (transaction) => transaction.id === +id
  );
  res.json({ transaction: transactionsArray[index] });
});

transactions.delete("/:id", (req, res) => {
  const { id } = req.params;
  transactionsArray = transactionsArray.filter(
    (transaction) => transaction.id !== +id
  );
  res.json({ transactions: transactionsArray });
});

module.exports = transactions;
