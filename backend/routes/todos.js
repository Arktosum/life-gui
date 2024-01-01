const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const TodoItem = require("../models/todoSchema");
const verifyToken = require("../middeware/middleware");

// Get all tasks
router.get("/", verifyToken, async (req, res) => {
  try {
    const allTasks = await TodoItem.find({ isSubtask: false });
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Create a new task
router.post("/", verifyToken, async (req, res) => {
  try {
    const newTask = await TodoItem.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Add subtasks to a task
router.post("/:taskId/subtasks", verifyToken, async (req, res) => {
  const { taskId } = req.params;

  try {
    const parentTask = await TodoItem.findById(taskId);
    if (!parentTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    const newSubtask = await TodoItem.create({ ...req.body, isSubtask: true });
    parentTask.subtasks.push(newSubtask._id);
    await parentTask.save();

    res.status(201).json(newSubtask);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Edit a task
router.put("/:taskId", verifyToken, async (req, res) => {
  const { taskId } = req.params;
  try {
    const updatedTask = await TodoItem.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a task
router.delete("/:taskId", verifyToken, async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await TodoItem.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // If it's a subtask, remove its reference from the parent task
    if (deletedTask.isSubtask) {
      const parentTask = await TodoItem.findById(deletedTask.subtasks[0]);
      parentTask.subtasks.pull(deletedTask._id);
      await parentTask.save();
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
