import React from 'react';
import { Navigate } from 'react-router-dom'; // For redirecting
import { useSelector } from 'react-redux'; // For accessing the Redux store state

// Component to handle routes accessible to unauthenticated users
export default function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth); // Get the token from the Redux store state

  // If the user is not authenticated (token is null)
  if (token === null) {
    return children; // Render the children components
  } else {
    return <Navigate to="/dashboard" />; // Redirect authenticated user to the dashboard
  }
}
