import { useState, useEffect } from 'react';
import VehicleForm from './components/VehicleForm'
import FilterBar from './components/FilterBar'
import VehicleTable from './components/VehicleTable'
import { vehicleAPI } from './services/api';  //comms
import './App.css'

function App() {
  const [allRecords, setAllRecords] = useState([]); //all records stored
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchPlate: '',
    vehicleType: 'all',
  });

  // Fetch records 
  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const data = await vehicleAPI.getRecords(); //api hits get
      setAllRecords(data);
      applyFilters(data, filters);
    } catch (error) {
      console.error('Error fetching records:', error);
      setAllRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    // Refresh every 5 seconds
    const interval = setInterval(fetchRecords, 5000);
    return () => clearInterval(interval);
  }, []);

  // Apply filters to records
  const applyFilters = (records, currentFilters) => {
    let filtered = records;

    // Filter by license plate
    if (currentFilters.searchPlate) {
      filtered = filtered.filter(record =>
        record.vehicle_number.toLowerCase().includes(currentFilters.searchPlate.toLowerCase())
      );
    }

    // Filter by vehicle type
    if (currentFilters.vehicleType !== 'all') {
      filtered = filtered.filter(record =>
        record.vehicle_type.toLowerCase() === currentFilters.vehicleType.toLowerCase()
      );
    }

    setFilteredRecords(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(allRecords, newFilters);
  };

  const handleRecordAdded = () => {
    fetchRecords();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🚗 Toll Plaza Dashboard</h1>
        <p>Real-time vehicle monitoring and toll fee calculation</p>
      </header>

      <main className="app-main">
        <section className="form-section">
          <VehicleForm onRecordAdded={handleRecordAdded} />
        </section>

        <section className="filter-section">
          <FilterBar onFilterChange={handleFilterChange} />
        </section>

        <section className="table-section">
          <VehicleTable records={filteredRecords} isLoading={isLoading} />
        </section>
      </main>
    </div>
  )
}

export default App
