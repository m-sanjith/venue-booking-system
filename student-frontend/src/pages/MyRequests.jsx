import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RequestTable from "../components/RequestTable";
import { getMyRequests } from "../services/api";

function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const result = await getMyRequests();
      if (result.success) setRequests(result.data);
    };
    fetchRequests();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page">
        <h1>My Booking Requests</h1>
        <p>Track the status of your requests.</p>
        <RequestTable requests={requests} />
      </div>
    </>
  );
}

export default MyRequests;