import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const isLoggedIn = user && isAuthenticated;

  return isLoggedIn ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
