import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="headerr">
      <h1 className="header-titlee">Employee Management</h1>
      <div className="header-buttonss">
        <Link to="/" className="button-linkk">
          Home
        </Link>
        <Link to="#footer" className="button-linkk">
          About
        </Link>
        {token && (
          <button className="button-linkk logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
