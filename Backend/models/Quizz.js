const mongoose = require("mongoose"); // Database interaction library

// Quiz schema definition
const quizzSchema = new mongoose.Schema(
  {
    // Quiz title (required)
    quizzName: {
      type: String,
      required: true,
    },
    // Quiz type (required, can be "Poll" or "Q&A")
    quizzType: {
      type: String,
      enum: ["Poll", "Q&A"],
      required: true,
    },
    // Array of question IDs (references the Question model)
    questions: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
      required: true, // Questions are mandatory
      validate: {
        // Validate number of questions (1 to 5)
        validator: (questions) =>
          questions.length >= 1 && questions.length <= 5,
      },
    },
    // Number of times the quiz has been viewed (default 0)
    impression: {
      type: Number,
      default: 0,
    },
    // Quiz timer setting (default 'OFF', can be '5' or '10' minutes)
    timer: {
      type: String,
      enum: ["OFF", "5", "10"],
      default: "OFF",
    },
    // Creator of the quiz (required)
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Add timestamps

// Export the quiz model
module.exports = mongoose.model("Quizz", quizzSchema);
