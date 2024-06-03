import { setToken } from "../slices/authSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

const backendURL = "http://localhost:3001/api/v1";

// Fetches trending quizzes
export const getTrendingQuizzs = async (token, dispatch) => {
  try {
    const result = await axios.get(`${backendURL}/quiz/trendingQuiz`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in authorization header
      },
      validateStatus(status) {
        return status === 201 || status === 403 || status === 401; // Accept only these status codes
      },
    });

    if (result.status === 201) {
      toast.success(result?.data?.message); // Show success message
      return result; // Return result on success
    }
    toast.error(result?.data?.message); // Show error message
    dispatch(setToken(null)); // Clear token from state
    localStorage.removeItem("token"); // Remove token from local storage
    return false;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong, try again later!"); // Show generic error message
    return false;
  }
};

// Fetches quizzes analysis
export const getQuizAnalyses = async (token, dispatch) => {
  try {
    const result = await axios.get(`${backendURL}/quiz/analysis`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in authorization header
      },
      validateStatus(status) {
        return status === 201 || status === 403 || status === 401; // Accept only these status codes
      },
    });

    if (result.status === 201) {
      if (result?.data?.quizzs.length === 0) {
        toast.success("There is no quiz to show, first create a quiz"); // Specific message if no quizzes are found
      } else {
        toast.success(result?.data?.message); // Show success message
      }
      return result; // Return result on success
    }
    toast.error(result?.data?.message); // Show error message
    dispatch(setToken(null)); // Clear token from state
    localStorage.removeItem("token"); // Remove token from local storage
    return false;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong, try again later!"); // Show generic error message
    return false;
  }
};

// Fetches specific quiz analysis
export const getQuizAnalysisById = async (token, quizId, dispatch) => {
  try {
    const result = await axios.get(`${backendURL}/quiz/analysis/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in authorization header
      },
      validateStatus(status) {
        return (
          status === 200 || status === 403 || status === 401 || status === 404
        ); // Accept only these status codes
      },
    });

    if (result.status === 200) {
      if (!result?.data?.quizz) {
        toast.success("There is no quiz to show, first create a quiz"); // Specific message if quiz is not found
      } else {
        toast.success(result?.data?.message); // Show success message
      }
      return result; // Return result on success
    } else if (result?.status === 404) {
      toast.error(result?.data?.message); // Show error message if quiz is not found
      return false;
    }
    dispatch(setToken(null)); // Clear token from state
    localStorage.removeItem("token"); // Remove token from local storage
    toast.error(result?.data?.message); // Show error message
    return false;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong, try again later!"); // Show generic error message
    return false;
  }
};

// Fetches quiz questions
export const getQuizQuestions = async (quizId, dispatch) => {
  try {
    const result = await axios.get(`${backendURL}/quiz/quizTest/${quizId}`, {
      validateStatus(status) {
        return (
          status === 200 || status === 404 || status === 401 || status === 403
        ); // Accept only these status codes
      },
    });

    if (result.status === 200) {
      toast.success(result?.data?.message); // Show success message
      return result?.data?.questions; // Return questions on success
    }
    toast.error(result?.data?.message); // Show error message if quiz is not found
    return false;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong, try again later!"); // Show generic error message
    return false;
  }
};

// Submits quiz answers and calculates score or updates poll results
export const submitQuiz = async (quizId, selectedOptions, dispatch) => {
  try {
    const result = await axios.post(
      `${backendURL}/quiz/submitTest`,
      {
        quizId,
        selectedOptions,
      },
      {
        validateStatus(status) {
          return (
            status === 200 || status === 403 || status === 401 || status === 404
          ); // Accept only these status codes
        },
      }
    );

    if (result.status === 200) {
      toast.success(result?.data?.message); // Show success message
      return result; // Return result on success
    }
    toast.error(result?.data?.message); // Show error message
    return false;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong, try again later!"); // Show generic error message
    return false;
  }
};

// Deletes a quiz
export const deleteQuizById = async (quizId, token, dispatch) => {
  try {
    const result = await axios.delete(`${backendURL}/quiz/delete/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in authorization header
      },
      validateStatus(status) {
        return (
          status === 200 || status === 403 || status === 401 || status === 404
        ); // Accept only these status codes
      },
    });

    if (result?.status === 200) {
      toast.success("Quiz Deleted Successfully"); // Show success message
      return true; // Return true on success
    } else if (result.status === 404) {
      toast.error(result?.data?.message); // Show error message if quiz is not found
      return false;
    }
    dispatch(setToken(null)); // Clear token from state
    localStorage.removeItem("token"); // Remove token from local storage
    toast.error(result?.data?.message); // Show error message
    return false;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong, try again later!"); // Show generic error message
    return false;
  }
};

// Creates a new quiz
export const createQuizApi = async (
  quizzName,
  quizzType,
  questions,
  timer,
  token,
  dispatch
) => {
  try {
    console.log(token);
    const result = await axios.post(
      `${backendURL}/quiz/createQuiz`,
      {
        quizzName,
        quizzType,
        questions,
        timer,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in authorization header
        },
        validateStatus(status) {
          return (
            status === 201 || status === 403 || status === 401 || status === 400
          ); // Accept only these status codes
        },
      }
    );

    if (result?.status === 201) {
      toast.success("Quiz Created Successfully"); // Show success message
      return result; // Return result on success
    } else if (result?.status === 400) {
      toast.error(result?.data?.message); // Show error message for bad request
      return false;
    }
    dispatch(setToken(null)); // Clear token from state
    localStorage.removeItem("token"); // Remove token from local storage
    toast.error(result?.data?.message); // Show error message
    return false;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong, try again later!"); // Show generic error message
    return false;
  }
};

// Fetches quiz details
export const getQuizDetailsById = async (quizzId, token, dispatch) => {
  try {
    const result = await axios.get(
      `${backendURL}/quiz/quizDetails/${quizzId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in authorization header
        },
        validateStatus(status) {
          return (
            status === 200 || status === 403 || status === 401 || status === 404
          ); // Accept only these status codes
        },
      }
    );

    if (result?.status === 200) {
      toast.success("Quiz Details Fetched Successfully"); // Show success message
      console.log(result);
      return result; // Return result on success
    } else if (result?.status === 404) {
      toast.error(result?.data?.message); // Show error message if quiz is not found
      return false;
    }
    dispatch(setToken(null)); // Clear token from state
    localStorage.removeItem("token"); // Remove token from local storage
    toast.error(result?.data?.message); // Show error message
    return false;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong, try again later!"); // Show generic error message
    return false;
  }
};
// Updates a quiz
export const updateQuizDetails = async (
  quizzId,
  questions,
  timer,
  token,
  dispatch
) => {
  try {
    const result = await axios.patch(
      `${backendURL}/quiz/update/${quizzId}`,
      {
        questions,
        timer,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in authorization header
        },
        validateStatus(status) {
          return (
            status === 200 || status === 403 || status === 401 || status === 404
          ); // Accept only these status codes
        },
      }
    );
    if (result?.status === 200) {
      toast.success(result?.data?.message); // Show success message
      return result; // Return result on success
    } else if (result?.status === 404) {
      toast.error(result?.data?.message); // Show error message if quiz is not found
      return false;
    }
    dispatch(setToken(null)); // Clear token from state
    localStorage.removeItem("token"); // Remove token from local storage
    toast.error(result?.data?.message); // Show error message
    return false;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong, try again later!"); // Show generic error message
    return false;
  }
};
