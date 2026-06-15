const API_BASE_URL = 'http://localhost:8000';

export const vehicleAPI = {
  // Fetch all vehicle records
  getRecords: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/record`);
      if (!response.ok) throw new Error('Failed to fetch records');
      return await response.json();
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error;
    }
  },

  // Add a new vehicle entry
  addRecord: async (vehicleData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/record`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleData),
      });
      if (!response.ok) throw new Error('Failed to add record');
      return await response.json();
    } catch (error) {
      console.error('Error adding record:', error);
      throw error;
    }
  },
};
