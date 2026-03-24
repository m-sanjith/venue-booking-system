import { Link, useNavigate } from "react-router-dom";
import { logoutStudent } from "../services/api";

function Navbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem("studentName");

  const handleLogout = () => {
    logoutStudent();
    navigate("/student/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">Venue Booking System</div>

      <div className="nav-links">
        <Link to="/student/dashboard">Dashboard</Link>
        <Link to="/student/book">Book Venue</Link>
        <Link to="/student/requests">My Requests</Link>
      </div>

      <div className="nav-user">
        <span>{name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;