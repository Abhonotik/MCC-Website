const Task = require("../models/Task");

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
exports.getAllTasks = async (req, res) => {
  try {
      const tasks = await Task.find(); // Fetch all tasks
      res.status(200).json(tasks);
  } catch (error) {
      res.status(500).json({ message: "Error fetching tasks", error });
  }
};

exports.assignTask = async (req, res) => {
  try {
      const { userId, title, priority, dueDate } = req.body;

      // Create a new task and assign it to the user
      const task = await Task.create({
          user: userId,
          title,
          priority,
          dueDate,
          completed: false,
      });

      res.status(201).json(task);
  } catch (error) {
      res.status(500).json({ message: "Error assigning task", error });
  }
};
