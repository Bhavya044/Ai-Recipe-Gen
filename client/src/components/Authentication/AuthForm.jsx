import React, { useState } from "react";
import "./AuthForm.css";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">
        {isSignUp ? "Create Account" : "Welcome Back!"}
      </h2>
      <p className="auth-subtitle">
        {isSignUp ? "Sign up to get started" : "Sign in to continue"}
      </p>

      <form className="auth-form">
        {isSignUp && <input type="text" placeholder="Full Name" required />}
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>

      <p onClick={toggleForm} className="toggle-text">
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default AuthForm;
