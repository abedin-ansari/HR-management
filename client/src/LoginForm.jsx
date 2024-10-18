import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, login } from "./redux/employee/employeeAction";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const LoginForm = ({ setEmployeeId }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state) => state.employees.isAuthenticated
  );
  const error = useSelector((state) => state.employees.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await dispatch(login({ email, password }));
        if (response.payload && response.payload.employeeId) {
          setEmployeeId(response.payload.employeeId);
          localStorage.setItem("employeeId", response.payload.employeeId);
        }
      } else {
        await dispatch(signup({ username, email, password }));
      }
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className="title login">Login Form</div>
        <div className="title signup">Signup Form</div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input
            type="radio"
            name="slide"
            id="login"
            checked={isLogin}
            onChange={() => setIsLogin(true)}
          />
          <input
            type="radio"
            name="slide"
            id="signup"
            checked={!isLogin}
            onChange={() => setIsLogin(false)}
          />
          <label
            htmlFor="login"
            className="slide login"
            onClick={() => setIsLogin(true)}
          >
            Login
          </label>
          <label
            htmlFor="signup"
            className="slide signup"
            onClick={() => setIsLogin(false)}
          >
            Signup
          </label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          <form
            className={isLogin ? "login" : "signup"}
            onSubmit={handleSubmit}
          >
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!isLogin && (
              <div className="field">
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            )}
            <div className="field">
              <input
                type="text"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isLogin && (
              <div className="field">
                <input
                  type="password"
                  placeholder="Confirm password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value={isLogin ? "Login" : "Signup"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
