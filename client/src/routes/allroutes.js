// import { Routes, Route } from "react-router-dom";
// import LoginForm from "../LoginForm"; // Adjust the import path as necessary
// import Dashboard from "../Page/Dashboard/index"; // Adjust the import path as necessary
// import ProtectedRoute from "../ProtectedRoute"; // Adjust the import path

// const AllRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<LoginForm />} />
//       <Route
//         path="/Dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// };

// export default AllRoutes;

// allroutes.js
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../LoginForm"; // Adjust the path accordingly
import Dashboard from "../Page/Dashboard/index"; // Adjust the path accordingly
import { useSelector } from "react-redux"; // Access the Redux state

const AllRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.employees); // Accessing isAuthenticated from employees

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/Dashboard" /> : <LoginForm />}
      />
      <Route
        path="/Dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default AllRoutes;
