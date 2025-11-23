import React, { useState } from "react";
import PPI from "../prodApi";
import { useNavigate, Link } from "react-router-dom";
import "./AuthPages.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await PPI.post("/register", formData);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2>Register</h2>
        <input
      type="text"
      name="id"
      placeholder="Enter ID"
      value={formData.id}
      onChange={handleChange}
      required
    />
    <input
      type="text"
      name="username"
      placeholder="Enter Username"
      value={formData.username}
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
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
