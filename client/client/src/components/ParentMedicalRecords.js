// src/components/ParentMedicalRecords.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParentMedicalRecords = ({ petId }) => {
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/medical-records/pet/${petId}`);
        setMedicalRecords(response.data);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    };

    fetchMedicalRecords();
  }, [petId]);

  return (
    <div>
      <h3>Medical Records</h3>
      {medicalRecords.length > 0 ? (
        <ul>
          {medicalRecords.map((record) => (
            <li key={record._id}>{record.details}</li>
          ))}
        </ul>
      ) : (
        <p>No medical records found</p>
      )}
    </div>
  );
};

export default ParentMedicalRecords;
