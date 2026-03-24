function RequestTable({ requests }) {
  if (!requests.length) {
    return <p className="empty-text">No booking requests found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="request-table">
        <thead>
          <tr>
            <th>Venue</th>
            <th>Event</th>
            <th>Date</th>
            <th>Time</th>
            <th>Purpose</th>
            <th>Status</th>
            <th>Admin Note</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.venueName}</td>
              <td>{req.eventName}</td>
              <td>{req.date}</td>
              <td>{req.time}</td>
              <td>{req.purpose}</td>
              <td>
                <span className={`status ${req.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {req.status}
                </span>
              </td>
              <td>{req.adminNote || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestTable;