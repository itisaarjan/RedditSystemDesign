const jwt = require('jsonwebtoken');
const User = require('../model/user');

const JWT_SECRET='hellokxa';
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded Token:', decoded); // Log decoded token details

        const user = await User.findById(decoded.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        console.log('Authenticated User in Middleware:', user); // Log user details
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication Error:', error.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};


module.exports = { authenticate };
