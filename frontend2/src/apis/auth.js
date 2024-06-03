import axios from "axios";
import { toast } from "react-hot-toast";

const backendURL = "http://localhost:3001/api/v1";

// Function to handle user signup with error handling and toast notifications
export const signup = async (formData) => {
  try {
    console.log(formData); // Log form data for debugging purposes (optional)

    // Send POST request to signup endpoint with user data in FormData format
    const response = await axios.post(`${backendURL}/auth/signup`, formData, {
      validateStatus: (status) => {
        // Only accept successful (201), bad request (400), or conflict (409) responses
        return status === 400 || status === 409 || status === 201;
      },
    });

    if (response.status === 201) {
      // Signup successful!
      toast.success(response.data.message);
      return true; // Indicate successful signup
    } else {
      // Handle bad request (400) or conflict (409) errors
      toast.error(response.data.message);
      return false; // Indicate signup failure
    }
  } catch (error) {
    // Handle unexpected errors
    toast.error("Internal server error");
    console.error("Signup error:", error);
    return false; // Indicate signup failure
  }
};

// Function to handle user login with error handling and toast notifications
export const login = async (formData) => {
  try {
    // Send POST request to login endpoint with user data in FormData format
    const response = await axios.post(`${backendURL}/auth/login`, formData, {
      validateStatus: (status) => {
        // Only accept successful (201), unauthorized (401), or forbidden (403) responses
        return status === 201 || status === 401 || status === 403;
      },
    });

    if (response.status === 201) {
      // Login successful!
      toast.success(response.data.message);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return response.data.token; // Return the token for further use
    } else {
      // Handle unauthorized (401) or forbidden (403) errors
      toast.error(response.data.message);
      return null; // Indicate login failure
    }
  } catch (error) {
    // Handle unexpected errors
    toast.error("Internal server error");
    console.error("Login error:", error);
    return null; // Indicate login failure
  }
};
