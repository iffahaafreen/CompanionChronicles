import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 for generating vetId
import './Vaccinations.css'; // Ensure this file exists and is correctly imported

const Vaccination = () => {
  const { petId } = useParams();
  const [vaccinations, setVaccinations] = useState([]);
  const [editingVaccination, setEditingVaccination] = useState(null);
  const [updatedVaccination, setUpdatedVaccination] = useState({
    vaccinationId: '',
    vaccine: '',
    dateGiven: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchVaccinations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pets/${petId}/vaccinations`);
        setVaccinations(response.data);
      } catch (error) {
        console.error('Error fetching vaccinations:', error);
      }
    };

    fetchVaccinations();
  }, [petId]);

  const handleEditClick = (vaccination) => {
    setEditingVaccination(vaccination);
    setUpdatedVaccination({
      vaccinationId: vaccination.vaccinationId,
      vaccine: vaccination.vaccine,
      dateGiven: new Date(vaccination.dateGiven).toISOString().split('T')[0] // Format date for input
    });
    setIsFormVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVaccination((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    const payload = {
      vaccinationId: updatedVaccination.vaccinationId,
      vaccine: updatedVaccination.vaccine,
      dateGiven: updatedVaccination.dateGiven,
      vetId: uuidv4() // Generate vetId for the new record
    };

    try {
      if (editingVaccination) {
        // Update existing vaccination
        const response = await axios.put(`http://localhost:5000/vaccinations/${updatedVaccination.vaccinationId}`, payload);
        setVaccinations((prev) =>
          prev.map((vac) => (vac.vaccinationId === updatedVaccination.vaccinationId ? response.data : vac))
        );
      } else {
        // Add new vaccination
        const response = await axios.post(`http://localhost:5000/pets/${petId}/vaccinations`, payload);
        setVaccinations((prev) => [...prev, response.data]);
      }
      setUpdatedVaccination({ vaccinationId: '', vaccine: '', dateGiven: '' });
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error saving vaccination:', error);
    }
  };

  return (
    <div className="vaccination-container">
      <h2>Vaccinations</h2>
      <table className="vaccinations-table">
        <thead>
          <tr>
            <th>Date Given</th>
            <th>Vaccine</th>
          </tr>
        </thead>
        <tbody>
          {vaccinations.map((vaccination) => (
            <tr key={vaccination.vaccinationId} onClick={() => handleEditClick(vaccination)}>
              <td>{new Date(vaccination.dateGiven).toLocaleDateString()}</td>
              <td>{vaccination.vaccine}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => { setEditingVaccination(null); setIsFormVisible(true); }}>Add New Vaccination</button>
      {isFormVisible && (
        <div className="edit-form">
          <h3>{editingVaccination ? 'Edit Vaccination' : 'Add Vaccination'}</h3>
          <label>
            Vaccination ID:
            <input
              type="text"
              name="vaccinationId"
              value={updatedVaccination.vaccinationId}
              onChange={handleInputChange}
              disabled={!!editingVaccination} // Disable if editing existing vaccination
            />
          </label>
          <label>
            Vaccine:
            <input
              type="text"
              name="vaccine"
              value={updatedVaccination.vaccine}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Date Given:
            <input
              type="date"
              name="dateGiven"
              value={updatedVaccination.dateGiven}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={() => setIsFormVisible(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Vaccination;
