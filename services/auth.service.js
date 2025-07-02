const User = require("../model/user.model");
const jwt = require("../Utils/jwt.utils");

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.signUpservice = async (data) => {
  const { name, email, password, role = "user" } = data;

  const user = await User.create({ name, email, password, role });

  const accessToken = jwt.generateAccessToken({ _id: user._id, role: user.role });
  const refreshToken = jwt.generateRefreshToken({ _id: user._id, role: user.role });

  return { user, accessToken, refreshToken };
};
