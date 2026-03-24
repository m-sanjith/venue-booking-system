import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getVenues } from "../services/api";

function StudentDashboard() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      const result = await getVenues();
      if (result.success) setVenues(result.data);
    };
    fetchVenues();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="hero">
          <h1>Student Dashboard</h1>
          <p>View venues and submit booking requests.</p>
          <Link to="/student/book" className="primary-link">Request a Venue</Link>
        </div>

        <h2 className="section-title">Available Venues</h2>
        <div className="venue-grid">
          {venues.map((venue) => (
            <div className="venue-card" key={venue._id}>
              {venue.image && (
                <img
                  src={venue.image}
                  alt={venue.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderTopLeftRadius: "14px",
                    borderTopRightRadius: "14px"
                  }}
                />
              )}
              <div className="venue-card-body">
                <h3>{venue.name}</h3>
                <p><strong>Capacity:</strong> {venue.capacity}</p>
                <p><strong>Location:</strong> {venue.location}</p>
                <p><strong>Status:</strong> {venue.status}</p>
                <p>{venue.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;