const jwt = require('jsonwebtoken');
const User = require("../models/User");

const authenticateUser = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied: Invalid Token Format' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied: Invalid Token Format' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = { authenticateUser, authenticateAdmin };
