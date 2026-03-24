const API_URL = import.meta.env.VITE_API_URL || "https://venue-booking-system-yktl.onrender.com";

export const registerStudent = async (studentData) => {
  const res = await fetch(`${API_URL}/api/students/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  });

  return await res.json();
};

export const loginStudent = async (email, password) => {
  const res = await fetch(`${API_URL}/api/students/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("studentLoggedIn", "true");
    localStorage.setItem("studentToken", data.token);
    localStorage.setItem("studentName", data.student.name);
    localStorage.setItem("studentEmail", data.student.email);
  }

  return data;
};

export const logoutStudent = () => {
  localStorage.removeItem("studentLoggedIn");
  localStorage.removeItem("studentToken");
  localStorage.removeItem("studentName");
  localStorage.removeItem("studentEmail");
};

export const getVenues = async () => {
  const res = await fetch(`${API_URL}/api/venues`);
  return await res.json();
};

export const createBookingRequest = async (bookingData) => {
  const token = localStorage.getItem("studentToken");

  const res = await fetch(`${API_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });

  return await res.json();
};

export const getMyRequests = async () => {
  const token = localStorage.getItem("studentToken");

  const res = await fetch(`${API_URL}/api/bookings/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};