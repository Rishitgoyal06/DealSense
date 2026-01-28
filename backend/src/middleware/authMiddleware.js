import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError("Not authorized, no token", 401);
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decoded._id).select("-password");

  if (!user) {
    throw new ApiError("User not found", 401);
  }

  req.user = user._id; // Store only the user ID
  req.userObj = user;  // Store full user object if needed

  next();
});

export default protect;
