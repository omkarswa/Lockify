import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ---------- Normal Register ----------
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ---------- Normal Login ----------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ---------- Google OAuth ----------
export const googleAuth = async (req, res) => {
  try {
    const { tokenId } = req.body;

    if (!tokenId) return res.status(400).json({ message: "Token ID is required" });

    // 1️⃣ Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, sub: googleId } = ticket.getPayload();

    // 2️⃣ Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // 3️⃣ First time Google login → create new user
      user = new User({
        username: name,
        email,
        password: "", // Google login → no password
        googleId,
      });
      await user.save();
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5️⃣ Return token + user info
 // 5️⃣ Return token + user info
console.log("Google payload:", { email, name, googleId });
console.log("User found or created:", user);

res.status(200).json({
  message: "Google login successful",
  token,
  user: {
    id: user._id,
    username: user.username,
    email: user.email,
  },
});

  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({ message: "Google auth failed", error: err.message });
  }

console.log("Google payload:", { email, googleId });
console.log("User found or created:", user);


};
