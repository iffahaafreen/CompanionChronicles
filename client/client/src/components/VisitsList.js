// VisitsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import './VisitsList.css'; // Import the CSS file

const VisitsList = () => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pets/all/visits');
        setVisits(response.data);
      } catch (error) {
        console.error('Error fetching visits:', error);
      }
    };

    fetchVisits();
  }, []);

  return (
    <div className="visits-container">
      <h2>Visits List</h2>
      <table className="visits-table">
        <thead>
          <tr>
            <th>Visit ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((visit) => (
            <tr key={visit.visitId}>
              <td>{visit.visitId}</td>
              <td>{visit.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitsList;
