import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, type, children }) {
  if (!user && type === true) {
    return <Navigate to="/login" replace />;
  } else if (user && type === false) {
    return <Navigate to="/dashboard" replace />;
  } else return children;
}

export default ProtectedRoute;
