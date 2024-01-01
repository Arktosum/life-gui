const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const FriendItem = require("../models/friendSchema");
const verifyToken = require("../middeware/middleware");

router.get("/", verifyToken,async (req, res) => {
  try {
    const allItems = await FriendItem.find();
    res.status(200).json(allItems);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", verifyToken,async (req, res) => {
  try {
    const newItem = await FriendItem.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/:financeId",verifyToken, async (req, res) => {
  const { financeId } = req.params;
  try {
    const updatedItem = await FriendItem.findByIdAndUpdate(
      financeId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a task
router.delete("/:taskId", verifyToken,async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await FriendItem.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
