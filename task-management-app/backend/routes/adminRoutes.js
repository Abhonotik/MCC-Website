const express = require('express');
const { getAllUsers, getAllTasks, deleteUser, deleteTask, getUserProfile } = require('../controllers/adminController');


const User = require('../models/User'); // Add this line here
const Task = require('../models/Task');

const router = express.Router();

// Admin routes
router.get('/users/profile', getUserProfile); // New route for fetching user profile
router.get('/users', getAllUsers);

router.get('/tasks', getAllTasks);
router.delete('/users/:id', deleteUser);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
