const express = require('express');
const { getUserProfile, updateUserProfile, deleteUser, getTotalUsers } = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware'); // Import both middlewares from the same file

const router = express.Router();


router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile); // Update user profile
router.delete('/:id', authMiddleware, deleteUser); // Delete user
router.get('/total-users', authMiddleware, adminMiddleware, getTotalUsers); // Get total user count (Admin only)

module.exports = router;
