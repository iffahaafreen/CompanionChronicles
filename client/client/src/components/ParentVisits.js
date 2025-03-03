// src/components/ParentVisits.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParentVisits = ({ petId }) => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/visits/pet/${petId}`);
        setVisits(response.data);
      } catch (error) {
        console.error('Error fetching visits:', error);
      }
    };

    fetchVisits();
  }, [petId]);

  return (
    <div>
      <h3>Visits</h3>
      {visits.length > 0 ? (
        <ul>
          {visits.map((visit) => (
            <li key={visit._id}>{visit.date} - {visit.reason}</li>
          ))}
        </ul>
      ) : (
        <p>No visits found</p>
      )}
    </div>
  );
};

export default ParentVisits;
