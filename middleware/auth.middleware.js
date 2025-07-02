const jwt = require("../Utils/jwt.utils");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  console.log(token);
  try {
    const decoded = jwt.verifyAccessToken(token);

    req.user = {
      _id: decoded.userId,
      role: decoded.role
    };

    next();
  } catch {
    res.status(401).json({ message: "Invalid Token" });
  }
};
