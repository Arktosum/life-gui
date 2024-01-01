const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const FinanceItem = require("../models/financeSchema");
const verifyToken = require("../middeware/middleware");

router.get("/",verifyToken, async (req, res) => {
  try {
    const allItems = await FinanceItem.find();
    res.status(200).json(allItems);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/",verifyToken, async (req, res) => {
  try {
    const newItem = await FinanceItem.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/:financeId",verifyToken, async (req, res) => {
  const { financeId } = req.params;
  try {
    const updatedItem = await FinanceItem.findByIdAndUpdate(
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
router.delete("/:taskId",verifyToken, async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await FinanceItem.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // If it's a subtask, remove its reference from the parent task
    if (deletedTask.isSubtask) {
      const parentTask = await FinanceItem.findById(deletedTask.subtasks[0]);
      parentTask.subtasks.pull(deletedTask._id);
      await parentTask.save();
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
