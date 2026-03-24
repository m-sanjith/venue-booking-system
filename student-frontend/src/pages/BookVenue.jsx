import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createBookingRequest, getVenues } from "../services/api";

function BookVenue() {
  const navigate = useNavigate();
  const studentName = localStorage.getItem("studentName");
  const studentEmail = localStorage.getItem("studentEmail");

  const [venues, setVenues] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    studentName: studentName || "",
    studentEmail: studentEmail || "",
    venueId: "",
    eventName: "",
    date: "",
    time: "",
    purpose: "",
  });

  useEffect(() => {
    const fetchVenues = async () => {
      const result = await getVenues();
      if (result.success) {
        setVenues(result.data.filter((v) => v.status === "Available"));
      }
    };
    fetchVenues();
  }, []);

  const getTomorrowDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createBookingRequest(form);

    if (result.success) {
      setMessage(result.message);
      setTimeout(() => navigate("/student/requests"), 1000);
    } else {
      setMessage(result.message);
    }
    const tomorrow = getTomorrowDate();
    if (form.date < tomorrow) {
      setMessage("Please select a date from tomorrow onwards.");
      return;
    }
  };

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="form-card">
          <h1>Book a Venue</h1>
          {message && <p className="success-text">{message}</p>}

          <form className="booking-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="studentName"
              value={form.studentName}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="studentEmail"
              value={form.studentEmail}
              onChange={handleChange}
              required
            />

            <select
              name="venueId"
              value={form.venueId}
              onChange={handleChange}
              required
            >
              <option value="">Select Venue</option>
              {venues.map((venue) => (
                <option key={venue._id} value={venue._id}>
                  {venue.name} - {venue.location}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="eventName"
              placeholder="Event Name"
              value={form.eventName}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              min={getTomorrowDate()}
              required
            />

            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />

            <textarea
              name="purpose"
              placeholder="Purpose of booking"
              value={form.purpose}
              onChange={handleChange}
              rows="4"
              required
            />

            <button type="submit">Submit Request</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookVenue;