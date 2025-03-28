const mongoose = require('mongoose');
const User = require('../models/User');
const Task = require('../models/Task');

/**
 * @desc Get all users
 * @route GET /admin/users
 */
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password'); // Exclude password
        res.status(200).json(users);
    } catch (error) {
        next(error); // Pass error to centralized error handler
    }
};

/**
 * @desc Get all tasks
 * @route GET /admin/tasks
 */
const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        next(error); // Pass error to centralized error handler
    }
};

/**
 * @desc Delete a user
 * @route DELETE /admin/users/:id
 */
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error); // Pass error to centralized error handler
    }
};

/**
 * @desc Delete a task
 * @route DELETE /admin/tasks/:id
 */
const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid task ID' });
        }

        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        next(error); // Pass error to centralized error handler
    }
};

const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user
        const user = await User.findById(userId).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error); // Pass error to centralized error handler
    }
};

module.exports = {
    getUserProfile,

    getAllUsers,
    getAllTasks,
    deleteUser,
    deleteTask,
};
