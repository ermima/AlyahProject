import { Navigate, Outlet } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const ProtectedRoute = ({ role, allowedRoles }) => {
  const userRole = localStorage.getItem("role"); // Get the user's role from localStorage

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />; // Redirect to login if not authorized
  }

  return <Outlet />; // Render the child routes if authorized
};

export default ProtectedRoute;
