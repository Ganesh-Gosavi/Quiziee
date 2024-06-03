const mongoose = require("mongoose"); // Database interaction library

// Option sub-schema (for defining question options)
const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: function () {
      // Required if option type is 'text' or 'textImage'
      return this.optionType === "textImage" || this.optionType === "text";
    },
    default: "", // Default empty string
  },
  imageurl: {
    type: String,
    required: function () {
      // Required if option type is 'textImage' or 'image'
      return this.optionType === "textImage" || this.optionType === "image";
    },
    default: "", // Default empty string
  },
});

// Main question schema
const questionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true, // Question description is mandatory
    },
    optionType: {
      type: String,
      enum: ["text", "image", "textImage"], // Allowed option types
      required: true, // Option type is mandatory
    },
    options: {
      type: [optionSchema], // Array of options using the sub-schema
      required: true, // Options are mandatory
      validate: {
        // Validate number of options (2 to 4)
        validator: (options) => options.length >= 2 && options.length <= 4,
      },
    },
    selectedOptions: {
      // Counts for chosen options
      option1: { type: Number, default: 0 },
      option2: { type: Number, default: 0 },
      option3: { type: Number, default: 0 },
      option4: { type: Number, default: 0 },
    },
    correctAnswered: { type: Number, default: 0 }, // Count of correct answers
    incorrectAnswered: { type: Number, default: 0 }, // Count of incorrect answers
    correctOption: { type: Number }, // Stores the correct option number
  },
  { timestamps: true }
); // Add timestamps

// Export the question model
module.exports = mongoose.model("Question", questionSchema);
