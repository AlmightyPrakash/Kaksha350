const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};


exports.isInstructorOrAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user || (user.role !== "admin" && user.role !== "instructor")) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

