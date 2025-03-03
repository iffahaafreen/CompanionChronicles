import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import './MedicalRecordsList.css'; // Import the CSS file

const MedicalRecordsList = () => {
  const [records, setMedicalRecords] = useState([]);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pets/all/medical-records');
        console.log('Fetched medical records:', response.data);
        setMedicalRecords(response.data);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    };

    fetchMedicalRecords();
  }, []);

  return (
    <div className="medical-records-container">
      <h2>Medical Records List</h2>
      <table className="medical-records-table">
        <thead>
          <tr>
            <th>Record ID</th>
            <th>Pet ID</th>
            <th>Vet ID</th>
            <th>Diagnosis</th>
            <th>Treatment</th>
            <th>Medications</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.recordId}>
              <td>{record.recordId}</td>
              <td>{record.petId}</td>
              <td>{record.vetId}</td>
              <td>{record.diagnosis}</td>
              <td>{record.treatment}</td>
              <td>
                {record.medications.map((med, index) => (
                  <div key={index}>
                    {med.name} - {med.dosage}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalRecordsList;
