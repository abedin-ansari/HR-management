import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../LoginForm";
import Dashboard from "../Page/Dashboard/index";
import { useSelector } from "react-redux";

const AllRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.employees);

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
