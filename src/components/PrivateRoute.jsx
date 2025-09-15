import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!user) return <Navigate to="/join-us" replace />;
  return children;
};

export default PrivateRoute;
