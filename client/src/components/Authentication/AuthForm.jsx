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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignup) {
        await signup(formData.name, formData.email, formData.password);
        toast.success("🦄 Sign up successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        await signin(formData.email, formData.password);
        toast.success("🦄 Sign in successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      onClose(); // Close modal on success
    } catch (err) {
      setError(err.message);
      toast.error("Error: " + err.message);
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
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
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
