import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginStudent } from "../services/api";

function StudentLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginStudent(form.email, form.password);
    if (result.success) navigate("/student/dashboard");
    else setError(result.message);
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Student Login</h1>
        <p>Login to request a venue booking</p>
        {error && <p className="error-text">{error}</p>}

        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />

        <button type="submit">Login</button>

        <p className="switch-text">
          Don’t have an account? <Link to="/student/signup">Create Account</Link>
        </p>
      </form>
    </div>
  );
}

export default StudentLogin;