import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function() { return !this.googleId; } // only required if googleId is NOT present
  },
  googleId: { type: String }
});


export default mongoose.model("User", userSchema);
