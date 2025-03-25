import React, { useState, useEffect } from "react";
import "./Navbar.css";
import AuthForm from "./Authentication/AuthForm";

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
          <button
            className="signup-button"
            style={{ background: "black" }}
            onClick={handleLogout}
          >
            Sign Out
          </button>
        ) : (
          <button className="signup-button" onClick={() => setShowModal(true)}>
            Sign In
          </button>
        )}
      </nav>

      {/* Modal for Sign In/Sign Up */}
      {showModal && !isAuthenticated && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <AuthForm
              onClose={() => {
                setShowModal(false);
                setIsAuthenticated(true); // Update login state after signing in
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
