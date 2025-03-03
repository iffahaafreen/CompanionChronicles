// src/components/ParentVaccinations.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParentVaccinations = ({ petId }) => {
  const [vaccinations, setVaccinations] = useState([]);

  useEffect(() => {
    const fetchVaccinations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/vaccinations/pet/${petId}`);
        setVaccinations(response.data);
      } catch (error) {
        console.error('Error fetching vaccinations:', error);
      }
    };

    fetchVaccinations();
  }, [petId]);

  return (
    <div>
      <h3>Vaccinations</h3>
      {vaccinations.length > 0 ? (
        <ul>
          {vaccinations.map((vaccination) => (
            <li key={vaccination._id}>{vaccination.vaccine} - {vaccination.dateGiven}</li>
          ))}
        </ul>
      ) : (
        <p>No vaccinations found</p>
      )}
    </div>
  );
};

export default ParentVaccinations;
