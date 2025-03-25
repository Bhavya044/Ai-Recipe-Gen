import React from "react";
import AuthForm from "./AuthForm";
import "./AuthModal.css";

const AuthModal = ({
  showModal,
  setShowModal,
  setIsAuthenticated,
  isAuthenticated,
}) => {
  return (
    showModal &&
    !isAuthenticated && (
      <div className="modal-overlay" onClick={() => setShowModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={() => setShowModal(false)}>
            ×
          </button>
          <AuthForm
            onClose={() => {
              setShowModal(false);
              setIsAuthenticated(true);
            }}
          />
        </div>
      </div>
    )
  );
};

export default AuthModal;
