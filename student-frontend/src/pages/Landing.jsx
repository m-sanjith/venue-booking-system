function Landing() {
  const adminUrl = import.meta.env.VITE_ADMIN_URL || "https://venue-booking-admin.vercel.app";

  return (
    <div className="landing-page">
      <div className="landing-card">
        <h1>Venue Booking System</h1>
        <p>Select your portal</p>

        <div className="role-buttons">
          <a href="/student/login" className="primary-link">Student Portal</a>
          <a href={adminUrl} className="secondary-link">Admin Portal</a>
        </div>
      </div>
    </div>
  );
}

export default Landing;