const express = require("express"); // Import the Express module
const router = express.Router(); // Create a new router object for modular routing

// Import the login and signup controller functions from the Auth controller (updated)
const { login, signup } = require("../controllers/Auth"); // Use signup instead of register for consistency

// Route for user signup (updated route name for clarity)
router.post("/signup", signup); // POST request to /signup triggers the signup function

// Route for user login
router.post("/login", login); // POST request to /login triggers the login function

// Export the router object for use in the main application
module.exports = router;
