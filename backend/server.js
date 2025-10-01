import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import passportConfig from "./config/passport.js";

dotenv.config();

const app = express();

// Passport config
passportConfig(passport);

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// // ---------- MongoDB connection ----------
// const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lockify";

mongoose.connect(process.env.MONGO_URI )
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ---------- Test root route ----------
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

// ---------- Auth Routes ----------
app.use("/api/auth", authRoutes);

// ---------- Start server ----------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
