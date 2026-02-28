const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const userService = require("./user.service");

const registerUser = async (userBody) => {
  const user = await userService.createUser(userBody);
  return user;
};

const loginUser = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(401, "Incorrect email or password");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { user, token };
};

module.exports = {
  registerUser,
  loginUser,
};