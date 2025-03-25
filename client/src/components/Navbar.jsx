import React, { useState } from "react";
import "./Navbar.css";
import AuthForm from "./Authentication/AuthForm";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="navbar transparent-blur">
        {/* Logo */}
        <h1 className="logo">CookMate AI</h1>

        {/* Signup Button */}
        <button className="signup-button" onClick={() => setShowModal(true)}>
          Sign Up
        </button>
      </nav>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <AuthForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
