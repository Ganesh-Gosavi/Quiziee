const express = require("express"); // Import the Express module

// Import quiz controller functions with descriptive names
const {
  createQuizz, //create
  getQuizAnalyses, // Fetches analyses of all quizzes
  getQuizAnalysisById, // Retrieves analysis for a specific quiz
  getTrendingQuizzs, // Gets trending quizzes
  deleteQuizById, // Deletes a specific quiz
  updateQuizDetails, // Updates details of a quiz
  getQuizDetailsById, // Fetches details of a specific quiz
  quizTest, // Provides quiz test data (no authentication)
  submitTest, // Submits quiz answers (no authentication)
} = require("../controllers/Quizz");

const { auth } = require("../middlewares/Auth"); // Import authentication middleware

const router = express.Router(); // Create a new router object

// **Routes requiring authentication (auth middleware)**

// Create a new quiz
router.post("/createQuiz", auth, createQuizz);

// Get analyses of all quizzes
router.get("/analysis", auth, getQuizAnalyses);

// Get analysis of a specific quiz by ID
router.get("/analysis/:quizId", auth, getQuizAnalysisById);

// Get trending quizzes
router.get("/trendingQuiz", auth, getTrendingQuizzs);

// Delete a specific quiz by ID
router.delete("/delete/:quizId", auth, deleteQuizById);

// Update details of a specific quiz
router.patch("/update/:quizId", auth, updateQuizDetails);

// Get details of a specific quiz by ID
router.get("/quizDetails/:quizId", auth, getQuizDetailsById);

// **Routes without authentication**

// Get quiz test data by ID
router.get("/quizTest/:quizId", quizTest);

// Submit quiz answers
router.post("/submitTest", submitTest);

// Export the router object for use in other parts of the application
module.exports = router;
