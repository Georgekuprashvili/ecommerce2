const userModel = require("../models/user.model");

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user || user.email !== "admin@gmail.com") {
      return res.status(403).json({ error: "Access denied. Admin only" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Authorization failed" });
  }
};

module.exports = isAdmin;
