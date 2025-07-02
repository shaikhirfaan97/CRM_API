const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_SECRET = process.env.JWT_SECRET || "access_secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh_secret";

exports.generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, ACCESS_SECRET, {
    expiresIn: "1h",
  });
};

exports.generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, REFRESH_SECRET, {
    expiresIn: "30d",
  });
};

exports.verifyAccessToken = (token) => jwt.verify(token, ACCESS_SECRET);
exports.verifyRefreshToken = (token) => jwt.verify(token, REFRESH_SECRET);
