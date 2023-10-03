const jwt = require("jsonwebtoken");

// JWT Authentication
const authenticateJWT = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_ACCESS_SERCET);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).json({ error: "Invalid token." });
  }
};

// Role-based Authorization
const authorizeRolesMiddleweear = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "You don't have permission to perform this action",
      });
    }
    next();
  };
};

// Combined Middleware
const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    await authenticateJWT(req, res, async () => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          error: "You don't have permission to perform this action",
        });
      }
      next();
    });
  };
};

module.exports = {
  authenticateJWT,
  authorizeRolesMiddleweear,
  authorizeRoles,
};
