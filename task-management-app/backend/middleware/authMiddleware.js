const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication Middleware
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: No token provided. Please include a valid Bearer token in the Authorization header.' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Debugging log

        // Fetch user and attach to request
        req.user = await User.findById(decoded.id || decoded.userId).select('-password');

        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(401).json({ message: 'Unauthorized: Invalid or expired token.' });
    }
};

// Admin Authorization Middleware
const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Admins only' });
    }
};

module.exports = { authMiddleware, adminMiddleware };
