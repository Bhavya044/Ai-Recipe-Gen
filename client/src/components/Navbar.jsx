import React, { useState, useEffect } from "react";
import "./Navbar.css";
import AuthForm from "./Authentication/AuthForm";
import AuthModal from "./Authentication/AuthModal";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status from localStorage (or API)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication
    setIsAuthenticated(false);
  };

  return (
    <>
      <nav className="navbar transparent-blur">
        {/* Logo */}
        <h1 className="logo">CookMate AI</h1>

        {/* Authentication Button */}
        {isAuthenticated ? (
          <div>
            <Link to="/saved-recipes">Saved Recipes</Link>
            <button
              className="signup-button"
              style={{ background: "black" }}
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button className="signup-button" onClick={() => setShowModal(true)}>
            Sign In
          </button>
        )}
      </nav>

      <AuthModal
        showModal={showModal}
        setShowModal={setShowModal}
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
};

export default Navbar;
