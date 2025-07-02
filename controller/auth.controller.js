const AuthService = require("../services/auth.service");
const jwt=require('../Utils/jwt.utils')
exports.signUp = async (req, res) => {
  try {
    const body = req.body;

    const existingUser = await AuthService.findUserByEmail(body.email);
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const { user, accessToken, refreshToken } = await AuthService.signUpservice(body);

    // Optional: Set refreshToken in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({ user, accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.findUserByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.generateAccessToken({ _id: user._id, role: user.role });
    const refreshToken = jwt.generateRefreshToken({ _id: user._id, role: user.role });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ user, accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};


exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No token found" });

    const decoded = jwt.verifyRefreshToken(token);
    const newAccessToken = jwt.generateAccessToken({
      _id: decoded.userId,
      role: decoded.role,
    });

    res.status(200).json({ token: newAccessToken });
  } catch {
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};
