const User = require("../models/User"); // Import User model
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import JWT for token generation

// Function to generate a JWT token
const generateToken = (user) => {
  // Payload contains user ID for verification after login
  return jwt.sign(
    { id: user._id.toString() },
    process.env.JWT_SECRET, // Secret key from environment variables
    { expiresIn: "12hr" } // Token expiration time set to 24 hours
  );
};

// Helper function to send an error response with appropriate status code
const errorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

// Signup function to create a new user
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Extract name, email, and password from request body

    // Check if all required fields are provided (400 - Bad Request)
    if (!name || !email || !password) {
      return errorResponse(
        res,
        400,
        "All fields (name, email, password) are required"
      );
    }

    // Check if a user with the same email already exists using a case-insensitive search (409 - Conflict)
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return errorResponse(
        res,
        409,
        "User with this email already exists. Please choose a different email."
      );
    }

    // Hash the password using bcrypt for secure storage (cost factor of 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the provided information and hashed password
    await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful!",
    });
  } catch (err) {
    console.error("Signup error:", err); // Log error for debugging
    errorResponse(res, 500, "Server error. Please try again.");
  }
};

// Login function to authenticate a user
// Login function to authenticate a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from request body

    // Find the user by their email address (converted to lowercase for case-insensitive matching)
    const user = await User.findOne({ email: email.toLowerCase() });

    // Handle case where user is not found (401 - Unauthorized)
    if (!user) {
      return errorResponse(res, 401, "User not registered. Please register.");
    }

    // Compare the provided password with the stored hashed password using bcrypt
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      // Generate a JWT token for the user if credentials are valid
      const token = generateToken(user);
      return res.status(201).json({
        success: true,
        token,
        message: "Login successful",
        userId: user._id.toString(),
      });
    } else {
      // Respond with 401 (Unauthorized) if password is incorrect
      return errorResponse(res, 401, "Invalid credentials.");
    }
  } catch (err) {
    console.error("Login error:", err); // Log error for debugging
    errorResponse(res, 500, "Server Error. Please try again.");
  }
};

module.exports = { signup, login }; // Export login and signup functions
