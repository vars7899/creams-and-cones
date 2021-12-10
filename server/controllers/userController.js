import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    create new user
// @route   POST /api/users/register
// @access  public
export const registerUser = asyncHandler(async (req, res) => {
  const { first_name, last_name, username, email, password, confirmPassword } =
    req.body;

  // check for missing fields
  if (!(first_name, last_name, username, email, password, confirmPassword)) {
    res.status(400).json({
      error: "missing one or more required fields",
      success: false,
    });
  }

  // check if the password is same
  if (password != confirmPassword) {
    res.status(400).json({
      error: "password do not match",
      success: false,
    });
  }

  // check if the user already exist
  const userAlreadyExist = await User.findOne({ email });

  if (userAlreadyExist) {
    res.status(200).json({
      error: `user already registered`,
      success: false,
    });
  }

  const usernameAlreadyExist = await User.findOne({ username });

  if (usernameAlreadyExist) {
    res.status(400).json({
      error: `username is already taken`,
      success: false,
    });
  }

  const user = await User.create({
    first_name,
    last_name,
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      isAdmin: user.isAdmin,
      email: user.email,
      token: generateToken(user._id),
      success: true,
    });
  }
});

// @desc    authorize user
// @route   POST /api/users/login
// @access  public
export const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      isAdmin: user.isAdmin,
      email: user.email,
      token: generateToken(user._id),
      success: true,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

// @desc    get user profile data
// @route   GET /api/users/profile
// @access  private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      isAdmin: user.isAdmin,
      email: user.email,
      success: true,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
