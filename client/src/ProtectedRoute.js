// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = useSelector(
//     (state) => state.employees.isAuthenticated
//   );

//   return isAuthenticated ? children : <Navigate to="/" />;
// };

// export default ProtectedRoute;

// protectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(
    (state) => state.employees.isAuthenticated
  ); // Accessing isAuthenticated from employees

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
