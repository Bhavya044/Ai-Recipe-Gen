import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signin, signup } from "../../services/authService";
import "./AuthForm.css";

const AuthForm = ({ onClose }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // NEW LOADING STATE

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Start loading

    try {
      if (isSignup) {
        await signup(formData.name, formData.email, formData.password);
        toast.success("🦄 Sign up successful!");
      } else {
        await signin(formData.email, formData.password);
        toast.success("🦄 Sign in successful!");
      }
      onClose(); // Close modal on success
    } catch (err) {
      setError(err.message);
      toast.error("Error: " + err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer />
      <h2 className="auth-title">{isSignup ? "Sign Up" : "Sign In"}</h2>
      <p className="auth-subtitle">
        {isSignup
          ? "Create a new account"
          : "Welcome back! Sign in to continue"}
      </p>

      {error && <p className="error">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="ingredient-input-field"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="ingredient-input-field"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="ingredient-input-field"
        />

        <button type="submit" className="generate-button" disabled={loading}>
          {loading
            ? isSignup
              ? "Signing Up..."
              : "Signing In..."
            : isSignup
            ? "Sign Up"
            : "Sign In"}
        </button>
      </form>

      <p onClick={() => setIsSignup(!isSignup)} className="toggle-auth">
        {isSignup
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default AuthForm;
