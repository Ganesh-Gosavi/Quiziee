const jwt = require("jsonwebtoken"); // Verify tokens

// Middleware to check user authorization with JWT
exports.auth = async (req, res, next) => {
  try {
    // Get token from Authorization header (remove "Bearer ")
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // Check for missing token and return 401 (Unauthorized)
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    // Verify token using secret key from environment variables
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store decoded user data

    // Move on if token is valid (next middleware or handler)
    next();
  } catch (error) {
    console.error(error); // Log errors
    return res.status(401).json({ success: false, message: "Invalid token" }); // 401 for invalid tokens
  }
};
