const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Forbidden: You don't have the required role" });
    }

    next();
  };
};

module.exports = { allowRoles };
