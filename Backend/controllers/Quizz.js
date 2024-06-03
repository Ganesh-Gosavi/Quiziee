const { default: mongoose } = require("mongoose");
const Question = require("../models/Question");
const Quizz = require("../models/Quizz");

// Helper function to send an error response
const errorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

// Create a new quiz
exports.createQuizz = async (req, res) => {
  try {
    const { id } = req.user; // User ID from authenticated user
    const { quizzName, quizzType, questions, timer } = req.body; // Extract quiz details from request body

    // Check if required fields are missing
    if (!quizzName || !quizzType || !questions || !timer) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const allQuestions = [];

    // Create each question and push to allQuestions array
    for (const question of questions) {
      const questionData = await Question.create({
        description: question.description,
        optionType: question.optionType,
        options: question.options,
        correctOption: question.correctOption,
      });
      allQuestions.push(questionData._id);
    }

    // Create the quiz with the created questions
    const quizzData = await Quizz.create({
      quizzName,
      quizzType,
      questions: allQuestions,
      createdBy: id,
      timer: timer,
    });

    // Send success response
    res
      .status(201)
      .json({ message: "Quizz created successfully", quizzId: quizzData._id });
  } catch (err) {
    // Handle any errors
    console.error(err);
    errorResponse(res, 500, "Internal server error");
  }
};

// Get trending quizzes created by the user
exports.getTrendingQuizzs = async (req, res) => {
  try {
    const { id } = req.user;

    // Retrieve total impressions and total quizzes created by the user
    const [totalImpressions, totalQuizzes] = await Promise.all([
      Quizz.aggregate([
        { $match: { createdBy: id } },
        { $group: { _id: null, totalImpression: { $sum: "$impression" } } },
      ]),
      Quizz.find({ createdBy: id }).countDocuments(),
    ]);

    // Calculate total questions across all quizzes created by the user
    const totalQuestionsResult = await Quizz.aggregate([
      { $match: { createdBy: id } },
      {
        $group: {
          _id: null,
          totalQuestions: { $sum: { $size: "$questions" } },
        },
      },
    ]);

    // Retrieve top trending 12 quizzes by impression
    const trendingQuizzes = await Quizz.find({
      createdBy: id,
      impression: { $gt: 10 },
    })
      .sort({ impression: -1 })
      .limit(12);

    // Send success response
    res.status(201).json({
      message: "Trending Quiz Fetched Successfully",
      totalImpressions:
        totalImpressions.length !== 0
          ? totalImpressions[0]?.totalImpression
          : 0,
      totalQuizzes: totalQuizzes,
      totalQuestions:
        totalQuestionsResult.length !== 0
          ? totalQuestionsResult[0]?.totalQuestions
          : 0,
      trendingQuizzes,
    });
  } catch (err) {
    console.error(err);
    errorResponse(res, 500, "Internal server error");
  }
};

// Get analysis of quizzes created by the user
exports.getQuizAnalyses = async (req, res) => {
  try {
    const { id } = req.user;
    const quizzs = await Quizz.find({ createdBy: id }).select(
      "quizzName impression createdAt _id"
    );

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Successfully fetched quizz analysis",
      quizzs,
    });
  } catch (error) {
    console.error(err);
    errorResponse(res, 500, "Internal server error");
  }
};

// Get detailed analysis of a specific quiz
exports.getQuizAnalysisById = async (req, res) => {
  try {
    const { id } = req.user;
    const { quizId } = req.params;
    const quizz = await Quizz.findOne({ _id: quizId, createdBy: id })
      .select("questions quizzType quizzName impression createdAt")
      .populate({
        path: "questions",
        select:
          "selectedOptions correctAnswered incorrectAnswered description options",
      });
    console.log(quizz);
    if (!quizz) {
      return errorResponse(res, 404, "Invalid quiz id");
    }

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Successfully fetched quiz analysis",
      quizz,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal server error");
  }
};

// Delete a quiz and its associated questions
exports.deleteQuizById = async (req, res) => {
  try {
    const { id } = req.user;
    const { quizId } = req.params;
    console.log(quizId);

    const quiz = await Quizz.findOne({ _id: quizId, createdBy: id }).populate(
      "questions"
    );
    if (!quiz) {
      return errorResponse(res, 404, "Quiz not found");
    }

    // Delete all questions associated with the quiz
    await Question.deleteMany({ _id: { $in: quiz.questions } });

    // Delete the quiz
    await Quizz.findByIdAndDelete(quizId);

    // Send success response
    res.status(200).json({
      success: true,
      message: "Quiz and associated questions deleted successfully",
    });
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal server error");
  }
};

// Get detailed quiz information
exports.getQuizDetailsById = async (req, res) => {
  try {
    const { id } = req.user;
    const { quizId } = req.params;

    // Query the quiz details
    const quizDetails = await Quizz.findOne({ createdBy: id, _id: quizId })
      .select("questions quizzType timer")
      .populate({
        path: "questions",
        select: "description optionType options correctOption",
      });

    if (!quizDetails) {
      return errorResponse(res, 404, "Quiz Not Found");
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "Successfully fetched quiz details",
      quizDetails,
    });
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal server error");
  }
};

// Update a quiz
exports.updateQuizDetails = async (req, res) => {
  try {
    const { id } = req.user; // User ID from authentication middleware
    const { quizId } = req.params; // Quiz ID from URL params
    const { questions, timer } = req.body; // Questions array from request body

    // Check if required fields are missing
    if (!questions || !timer) {
      return errorResponse(res, 400, "all field is required");
    }
    // Fetch the quiz to ensure it exists and belongs to the user
    const quiz = await Quizz.findOne({ _id: quizId, createdBy: id });
    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }
    const allQuestions = [];
    // Validate and update each question
    for (const question of questions) {
      console.log(question._id);
      const qz = await Question.findByIdAndUpdate(
        { _id: new mongoose.Types.ObjectId(question._id), createdBy: id },
        {
          description: question.description,
          optionType: question.optionType,
          options: question.options,
          correctOption: question.correctOption,
        },
        { new: true } // This option returns the updated document
      );
      if (!qz) {
        const newQz = await Question.create({
          description: question.description,
          optionType: question.optionType,
          options: question.options,
          correctOption: question.correctOption,
        });
        allQuestions.push(newQz._id);
      } else {
        allQuestions.push(qz._id);
      }
    }
    quiz.questions = allQuestions;
    quiz.timer = timer;
    await quiz.save();
    // Send success response
    res
      .status(200)
      .json({ success: true, message: "Quiz updated successfully" });
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal server error");
  }
};

// Fetch quiz test questions and update impressions
exports.quizTest = async (req, res) => {
  try {
    const { quizId } = req.params;

    // Update quiz impression
    const quiz = await Quizz.findByIdAndUpdate(quizId, {
      $inc: { impression: 1 },
    });
    if (!quiz) {
      return errorResponse(res, 404, "Invalid Quiz Link");
    }

    // Fetch quiz questions
    const quizzQuestions = await Quizz.findById(quizId)
      .select("questions quizzType timer")
      .populate({
        path: "questions",
        select: "description options optionType",
      });

    // Send success response
    res.status(200).json({
      success: true,
      message: "Quiz questions fetched successfully",
      questions: quizzQuestions,
    });
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal server error");
  }
};

// Submit quiz answers and calculate the score or update poll results
exports.submitTest = async (req, res) => {
  try {
    const { quizId, selectedOptions } = req.body;
    const quizzQuestions = await Quizz.findById(quizId).select("quizzType");

    if (!quizzQuestions) {
      return errorResponse(res, 404, "Quiz Not Found");
    }

    if (quizzQuestions.quizzType === "Poll") {
      await updatePollResults(selectedOptions);
      res
        .status(200)
        .json({ success: true, message: "Poll results updated successfully" });
    } else if (quizzQuestions.quizzType === "Q&A") {
      const score = await calculateScore(selectedOptions);
      res
        .status(200)
        .json({ success: true, score, message: "Here is your score" });
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal server error");
  }
};

// Helper function to update poll results
async function updatePollResults(selectedOptions) {
  const updatePromises = [];

  // Iterate through selected options and increment the appropriate option count
  for (const questionId in selectedOptions) {
    const selectedOption = selectedOptions[questionId];
    const update = {};

    switch (selectedOption) {
      case 0:
        update["selectedOptions.option1"] = 1;
        break;
      case 1:
        update["selectedOptions.option2"] = 1;
        break;
      case 2:
        update["selectedOptions.option3"] = 1;
        break;
      case 3:
        update["selectedOptions.option4"] = 1;
        break;
      default:
        break;
    }

    // Add update promise to the array
    updatePromises.push(
      Question.findByIdAndUpdate(
        questionId,
        { $inc: update },
        { new: true }
      ).exec()
    );
  }

  // Wait for all update operations to complete
  await Promise.all(updatePromises);
}

// Helper function to calculate the score of a quiz
async function calculateScore(selectedOptions) {
  let score = 0;

  // Iterate through selected options and calculate the score
  for (const questionId in selectedOptions) {
    const selectedOption = selectedOptions[questionId];
    const questionData = await Question.findById(questionId).select(
      "correctOption"
    );
    // Increment score if the selected option is correct
    if (selectedOption === questionData.correctOption) {
      score++;
      await Question.findByIdAndUpdate(questionId, {
        $inc: { correctAnswered: 1 },
      });
    } else {
      await Question.findByIdAndUpdate(questionId, {
        $inc: { incorrectAnswered: 1 },
      });
    }
  }

  return score;
}
