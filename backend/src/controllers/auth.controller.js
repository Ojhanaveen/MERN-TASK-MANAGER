const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const { user, tokens } = await authService.registerUser(req.body);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      tokens,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, tokens } = await authService.loginUser(
      email,
      password
    );

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      tokens,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};