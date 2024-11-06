import React from "react";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  // Check for the auth token (assuming you store it in local storage)
  const isAuthenticated = !!localStorage.getItem("authToken");

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the child components (protected content)
  return children;
};

export default AuthWrapper;
