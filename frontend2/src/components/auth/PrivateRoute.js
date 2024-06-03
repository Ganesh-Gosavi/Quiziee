import React from 'react';
import { useSelector } from 'react-redux'; // For accessing the Redux store state
import { Navigate } from 'react-router-dom'; // For redirecting

// Component to handle routes accessible only to authenticated users
export default function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth); // Get the token from the Redux store state

  // If the user is authenticated (token exists)
  if (token) {
    return children; // Render the children components
  } else {
    return <Navigate to="/" />; // Redirect unauthenticated user to the home page
  }
}
