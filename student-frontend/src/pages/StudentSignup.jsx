import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerStudent } from "../services/api";

function StudentSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    console.log("Create account clicked", form);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const result = await registerStudent({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      console.log("Signup response:", result);

      if (result.success) {
        setMessage(result.message || "Account created successfully");
        setTimeout(() => navigate("/student/login"), 1000);
      } else {
        setError(result.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Server error while creating account");
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Create Student Account</h1>
        <p>Register to request venue bookings</p>

        {message && <p className="success-text">{message}</p>}
        {error && <p className="error-text">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Student Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Account</button>

        <p className="switch-text">
          Already have an account? <Link to="/student/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default StudentSignup;