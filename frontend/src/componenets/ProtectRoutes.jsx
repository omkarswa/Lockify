// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // JWT check

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect if not logged in
  }

  return children; // Render children if token exists
}
