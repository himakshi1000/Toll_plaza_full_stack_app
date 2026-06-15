import './VehicleTable.css';

function VehicleTable({ records, isLoading }) {
  const getStatusClass = (status) => {
    return `status-${status.toLowerCase()}`;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (isLoading) {
    return <div className="loading">Loading records...</div>;
  }

  if (!records || records.length === 0) {
    return <div className="no-records">No vehicle records found</div>;
  }

  return (
    <div className="table-container">
      <table className="vehicle-table">
        <thead>
          <tr>
            <th>License Plate</th>
            <th>Vehicle Type</th>
            <th>Timestamp</th>
            <th>Toll Fee</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td className="plate">{record.vehicle_number}</td>
              <td className="type">
                {record.vehicle_type.charAt(0).toUpperCase() + record.vehicle_type.slice(1)}
              </td>
              <td className="timestamp">{formatDate(record.timestamp)}</td>
              <td className="fee">{formatCurrency(record.toll_amount)}</td>
              <td>
                <span className={`status-badge ${getStatusClass(record.status)}`}>
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleTable
