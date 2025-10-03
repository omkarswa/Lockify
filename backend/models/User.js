import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function() { return !this.googleId; }, // only required if no Google login
  },
  googleId: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // role field added
});

export default mongoose.model("User", userSchema);
