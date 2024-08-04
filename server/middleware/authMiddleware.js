const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Your User model

const authMiddleware = async (req, res, next) => {
  // Get token from headers
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET should be in your .env file

    // Fetch user from database using the decoded user ID
    const user = await User.findById(decoded.userId); // Adjust according to your user model

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach user to request object
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
