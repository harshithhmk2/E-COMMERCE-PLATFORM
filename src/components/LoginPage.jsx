import React, { useState } from "react";
import PPI from "../prodApi";
import { useNavigate, Link } from "react-router-dom";
import "./AuthPages.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await PPI.post("/login", formData);
      const token = res.data.token || res.data; // Adjust if your backend returns differently
      localStorage.setItem("authToken", token);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          placeholder="username"
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
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
