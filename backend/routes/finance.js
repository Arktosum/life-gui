const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const FinanceItem = require("../models/financeSchema");

router.post("/create", (req, res) => {
  const financeItem = new FinanceItem(req.body);

  financeItem
    .save()
    .then((savedTransaction) => {
      res.status(201).json(savedTransaction);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Route for fetching a transaction by ID
router.get("/read", (req, res) => {
  FinanceItem.find()
    .then((transactions) => {
      if (!transactions) {
        res.status(404).json({ message: "Transaction not found." });
      } else {
        res.status(200).json(transactions);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Route for deleting a transaction by ID
router.get("/delete/:id", async (req, res) => {
  const itemId = req.params.id;
  await FinanceItem.findByIdAndDelete(itemId);
  res.sendStatus(200);
});

module.exports = router;
