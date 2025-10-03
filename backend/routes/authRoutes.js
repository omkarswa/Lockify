import express from "express";
import {
  registerUser,
  loginUser,
  googleAuth,
} from "../controllers/authController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);

// Example protected route
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

// Example admin-only route
router.get("/all-users", protect, authorize("admin"), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

export default router;
