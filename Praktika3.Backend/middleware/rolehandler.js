module.exports = (requiredRoles) => {
  return (req, res, next) => {
    const user = req.user; // User info is attached by auth.js middleware
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!requiredRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
};

