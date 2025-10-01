import express from "express";
import { registerUser, loginUser, googleAuth } from "../controllers/authController.js";

const router = express.Router();

// Email/password signup
router.post("/register", registerUser);

// Email/password login
router.post("/login", loginUser);

// Google OAuth
router.post("/google", googleAuth);

export default router;
