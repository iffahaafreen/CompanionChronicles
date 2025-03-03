// VaccinationList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import './VaccinationList.css'; // Import the CSS file

const VaccinationList = () => {
  const [vaccinations, setVaccinations] = useState([]);

  useEffect(() => {
    const fetchVaccinations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pets/all/vaccinations');
        setVaccinations(response.data);
      } catch (error) {
        console.error('Error fetching vaccinations:', error);
      }
    };

    fetchVaccinations();
  }, []);

  return (
    <div className="vaccinations-container">
      <h2>Vaccinations List</h2>
      <table className="vaccinations-table">
        <thead>
          <tr>
            <th>Vaccination ID</th>
            <th>Vaccine</th>
          </tr>
        </thead>
        <tbody>
          {vaccinations.map((vaccination) => (
            <tr key={vaccination.vaccinationId}>
              <td>{vaccination.vaccinationId}</td>
              <td>{vaccination.vaccine}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VaccinationList;
