import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// REGISTER user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError("All fields are required", 400);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError("User already exists", 409);
  }

  const user = await User.create({ name, email, password });

  const token = user.generateAuthToken();

  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    token
  };

  return res.status(201).json(new ApiResponse(201, "User registered successfully", userData));
});

// LOGIN user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', { email, password: '***' });

  if (!email || !password) {
    throw new ApiError("Email and password are required", 400);
  }

  const user = await User.findOne({ email });
  console.log('User found:', user ? 'Yes' : 'No');

  if (!user) {
    throw new ApiError("Invalid credentials", 401);
  }

  console.log('Checking password...');
  const isPasswordValid = await user.isPasswordCorrect(password);
  console.log('Password valid:', isPasswordValid);

  if (!isPasswordValid) {
    throw new ApiError("Invalid credentials", 401);
  }

  const token = user.generateAuthToken();

  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    token
  };

  return res.json(new ApiResponse(200, "Login successful", userData));
});
