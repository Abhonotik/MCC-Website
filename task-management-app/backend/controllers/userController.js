const User = require('../models/User');

/**
 * @desc Get user profile
 * @route GET /api/users/profile
 * @access Private (Requires authentication)
 */
exports.getUserProfile = async (req, res) => {
    try {
        console.log("User from authMiddleware:", req.user); // Debug log

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: No user ID found' });
        }

        const user = await User.findById(req.user.id).select('-password'); 
        console.log("Fetching user with ID:", req.user.id); // Debug log

        if (!user) return res.status(404).json({ message: 'User not found. Please check your user ID.' });

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};

/**
 * @desc Update user profile
 * @route PUT /api/users/profile
 * @access Private (Requires authentication)
 */
exports.updateUserProfile = async (req, res) => {
    try {
        const { name, email, phone } = req.body; // Include phone in the request body

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: No user ID found' });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found. Please check your user ID.' });

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;

        const updatedUser = await user.save();
        res.status(200).json({
            message: 'User profile updated successfully',
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
            },
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: 'Error updating user profile', error });
    }
};

/**
 * @desc Delete a user
 * @route DELETE /api/users/:id
 */
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found. Please check your user ID.' });
        }

        await user.deleteOne();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

exports.getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments(); // Count all users in the database
        res.status(200).json({ totalUsers });
    } catch (error) {
        console.error("Error fetching total user count:", error);
        res.status(500).json({ message: 'Error fetching total user count', error });
    }
};
