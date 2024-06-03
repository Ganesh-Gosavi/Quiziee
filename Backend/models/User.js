const mongoose = require("mongoose"); // Database interaction library

// User schema definition
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Username (required)
  email: { type: String, required: true }, // Email address (required)
  password: { type: String, required: true }, // Password (required)
});

// Export the user model
module.exports = mongoose.model("User", userSchema);
