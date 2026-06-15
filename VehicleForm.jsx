import { useState } from 'react';
import { vehicleAPI } from '../services/api';
import './VehicleForm.css';

function VehicleForm({ onRecordAdded }) {
  const [formData, setFormData] = useState({
    vehicle_number: '',
    vehicle_type: 'car',
    is_government: false,
    status: 'Pending',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const vehicleTypes = ['car', 'bike', 'bus'];
  const statuses = ['Pending', 'Paid', 'Violation'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.vehicle_number.trim()) {
      setError('License plate is required');
      setLoading(false);
      return;
    }

    try {
      await vehicleAPI.addRecord(formData);
      setFormData({
        vehicle_number: '',
        vehicle_type: 'car',
        is_government: false,
        status: 'Pending',
      });
      if (onRecordAdded) onRecordAdded();
    } catch (err) {
      setError('Failed to add vehicle entry. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vehicle-form-container">
      <h2>Add New Vehicle Entry</h2>
      <form onSubmit={handleSubmit} className="vehicle-form">
        <div className="form-group">
          <label htmlFor="vehicle_number">License Plate:</label>
          <input
            type="text"
            id="vehicle_number"
            name="vehicle_number"
            value={formData.vehicle_number}
            onChange={handleChange}
            placeholder="e.g., ABC-1234"
            maxLength="20"
          />
        </div>

        <div className="form-group">
          <label htmlFor="vehicle_type">Vehicle Type:</label>
          <select
            id="vehicle_type"
            name="vehicle_type"
            value={formData.vehicle_type}
            onChange={handleChange}
          >
            {vehicleTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group checkbox">
          <label htmlFor="is_government">
            <input
              type="checkbox"
              id="is_government"
              name="is_government"
              checked={formData.is_government}
              onChange={handleChange}
            />
            Official/Government Vehicle
          </label>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Adding...' : 'Add Vehicle Entry'}
        </button>
      </form>
    </div>
  );
}

export default VehicleForm
