const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

/**
 * Create a new user
 */
const createUser = async (userBody) => {
  const existingUser = await User.findOne({ email: userBody.email });

  if (existingUser) {
    throw new ApiError(400, "Email already registered");
  }

  return User.create(userBody);
};

/**
 * Get user by email
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Get user by ID
 */
const getUserById = async (userId) => {
  return User.findById(userId);
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};