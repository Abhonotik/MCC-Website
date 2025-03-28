const express = require("express");
const { getAllTasks, getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔵 **User Routes**
router.get("/", authMiddleware, getTasks); // Fetch tasks for authenticated users
router.post("/", authMiddleware, createTask); // Create a new task
router.put("/:id", authMiddleware, updateTask); // Update a task (Consider changing to PATCH if partial update)
router.delete("/:id", authMiddleware, deleteTask); // Delete a task


// 🔴 **Admin Route**
router.post('/assign-task', authMiddleware, adminMiddleware, assignTask); // Admin-only route
router.get("/all-tasks", authMiddleware, adminMiddleware, getAllTasks); // Admin-only route to fetch all tasks

// ⚠ **Handle Invalid Routes (Optional)**
router.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

module.exports = router;
