const express = require("express");

const transactions = express.Router();

let transactionsArray = require("../models/transactions.models");

// MIDDLEWARE FUNCTION FOR PUT AND POST
function validateForm(req, res, next) {
  if (
    !req.body.item_name ||
    !req.body.amount ||
    !req.body.date ||
    !req.body.from ||
    !req.body.category ||
    !req.body.transactionType
  )
    res.status(400).json({ message: "Invalid Inputs" });
  else next();
}

transactions.get("/", (req, res) => {
  res.status(200).json({ transactions: transactionsArray });
});

transactions.post("/", validateForm, (req, res) => {
  const newId = transactionsArray[transactionsArray.length - 1].id + 1;
  req.body.id = newId;
  transactionsArray.push(req.body);
  res.status(200).json({ transactions: transactionsArray });
});

transactions.get("/:id", (req, res) => {
  const { id } = req.params;
  const index = transactionsArray.findIndex(
    (transaction) => transaction.id === +id
  );
  if (index === -1) {
    res.status(400).json({ error: "Transaction Not Found" });
  } else {
    res.json({ transaction: transactionsArray[index] });
  }
});

transactions.put("/:id", validateForm, (req, res) => {
  const { id } = req.params;
  const targetIndex = transactionsArray.findIndex(
    (transaction) => transaction.id === +id
  );
  if (targetIndex === -1) {
    res.status(400).json({ message: "Transaction Not Found" });
  } else {
    transactionsArray[targetIndex] = req.body;
    res.status(200).json({ transactions: transactionsArray });
  }
});

transactions.delete("/:id", (req, res) => {
  const { id } = req.params;
  transactionsArray = transactionsArray.filter(
    (transaction) => transaction.id !== +id
  );
  res.status(200).json({ transactions: transactionsArray });
});

module.exports = transactions;
