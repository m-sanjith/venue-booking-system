import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
import StudentDashboard from "./pages/StudentDashboard";
import BookVenue from "./pages/BookVenue";
import MyRequests from "./pages/MyRequests";

function App() {
  const isLoggedIn = localStorage.getItem("studentLoggedIn") === "true";

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/signup" element={<StudentSignup />} />
      <Route
        path="/student/dashboard"
        element={isLoggedIn ? <StudentDashboard /> : <Navigate to="/student/login" />}
      />
      <Route
        path="/student/book"
        element={isLoggedIn ? <BookVenue /> : <Navigate to="/student/login" />}
      />
      <Route
        path="/student/requests"
        element={isLoggedIn ? <MyRequests /> : <Navigate to="/student/login" />}
      />
    </Routes>
  );
}

export default App;