const { Task } = require("../models/taskModel");
const { User } = require("../models/userModel");

// Create a task
const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get tasks
const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "Admin") {
      tasks = await Task.findAll({ include: User });
    } else {
      tasks = await Task.findAll({ where: { userId: req.user.id } });
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "Admin" && task.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await task.update(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "Admin" && task.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await task.destroy();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
