import React, { useState, useEffect } from "react";
import "./Navbar.css";
import AuthForm from "./Authentication/AuthForm";
import AuthModal from "./Authentication/AuthModal";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <>
      <nav className="navbar dark-purple-theme">
        <div className="header-title">
          <span className="logo">CookMate AI</span>
          <span className="subtitle">Your AI-powered recipe assistant</span>
        </div>
        {isAuthenticated ? (
          <div className="nav-links">
            <Link to="/saved-recipes" className="nav-link">
              Saved Recipes
            </Link>
            <button className="auth-button" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        ) : (
          <button className="auth-button" onClick={() => setShowModal(true)}>
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
