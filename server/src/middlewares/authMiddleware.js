import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const Protect = async (req, res, next) => {
  try {
       const Chatty = req.cookies?.Chatty;
    if (!Chatty) {
      const error = new Error("Unauthorized: No token provided");
      error.statusCode = 401;
      return next(error);
    }

    let tea;
    try {
      tea = jwt.verify(Chatty, process.env.JWT_SECRET);
    } catch (err) {
      const error = new Error("Unauthorized: Invalid token");
      error.statusCode = 401;
      return next(error);
    }

    const verifiedUser = await User.findById(tea.id);
    if (!verifiedUser) {
      const error = new Error("Unauthorized: User not found");
      error.statusCode = 401;
      return next(error);
    }

    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);
  }
};

