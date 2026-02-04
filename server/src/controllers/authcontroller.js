import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    console.log("loginUser body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie for server-side protected routes
    res.cookie("Chatty", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("loginUser error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




export const registerUser = async (req, res) => {
  try {
    console.log("registerUser body:", req.body);
    const { fullName, email, mobileNumber, password } = req.body;

    if (!fullName || !email || !mobileNumber || !password)
      return res.status(400).json({ message: "All fields required" });

    // Basic server-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    if (!mobileRegex.test(mobileNumber))
      return res.status(400).json({ message: "Invalid mobile number" });

    if (password.length < 6)
      return res.status(400).json({ message: "Password too short" });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists" });

    const mobileExists = await User.findOne({ mobileNumber });
    if (mobileExists)
      return res.status(400).json({ message: "Mobile number already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      mobileNumber,
      password: hashedPassword,
    });

    // ensure JWT secret is configured
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    // generate token and set cookie
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("Chatty", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("registerUser error:", error && error.message, error && error.stack);
    res.status(500).json({ message: "Server error" });
  }
};