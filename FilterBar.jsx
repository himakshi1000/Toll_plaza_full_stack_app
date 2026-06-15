import { useState } from 'react';
import './FilterBar.css';

function FilterBar({ onFilterChange }) {
  const [searchPlate, setSearchPlate] = useState('');
  const [vehicleType, setVehicleType] = useState('all');
  const [status, setStatus] = useState('all');

  const vehicleTypes = ['all', 'car', 'bike', 'bus'];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchPlate(value);
    onFilterChange({
      searchPlate: value,
      vehicleType: vehicleType,
    });
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setVehicleType(value);
    onFilterChange({
      searchPlate: searchPlate,
      vehicleType: value,
    });
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    onFilterChange({
      searchPlate: searchPlate,
      vehicleType: vehicleType,
      status: value
    })
  };

  const handleClear = () => {
    setSearchPlate('');
    setVehicleType('all');
    setStatus('all');
    onFilterChange({
      searchPlate: '',
      vehicleType: 'all',
      status: 'all'
    });
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Search by License Plate..."
          value={searchPlate}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="filter-group">
        <select 
          value={vehicleType}
          onChange={handleTypeChange}
          className="type-select"
        >
          {vehicleTypes.map(type => (
            <option key={type} value={type}>
              {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

    <div className="filter-group">
        <select
          value={status}
          onChange={handleStatusChange}
          className ='Status-search'
          ></select>
        </div>

      <button onClick={handleClear} className="clear-btn">
        Clear Filters
      </button>
    </div>
  );
}

export default FilterBar
