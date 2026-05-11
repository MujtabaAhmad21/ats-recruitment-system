const jwt = require('jsonwebtoken');

// Verifies if the user is logged in at all
exports.protect = (req, res, next) => {
  let token = req.headers.authorization;
  
  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1]; // Extract token from "Bearer <token>"
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user info to the request
      next(); // Move to the next function
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Verifies if the logged-in user is HR or Admin
exports.hrOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'hr' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. HR/Admin only.' });
  }
};
