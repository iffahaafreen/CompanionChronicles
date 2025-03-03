import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ParentPets.css';

const ParentPets = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [visits, setVisits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        // Fetch pet details
        const petResponse = await axios.get(`http://localhost:5000/pets/${petId}`);
        setPet(petResponse.data);

        // Fetch medical records for the specific pet
        const medicalRecordsResponse = await axios.get(`http://localhost:5000/pets/${petId}/medical-records`);
        setMedicalRecords(medicalRecordsResponse.data);

        // Fetch vaccinations for the specific pet
        const vaccinationsResponse = await axios.get(`http://localhost:5000/pets/${petId}/vaccinations`);
        setVaccinations(vaccinationsResponse.data);

        // Fetch visits for the specific pet
        const visitsResponse = await axios.get(`http://localhost:5000/pets/${petId}/visits`);
        setVisits(visitsResponse.data);

        setError(null);
      } catch (error) {
        setError('Error fetching pet details');
      }
    };

    fetchPetDetails();
  }, [petId]);

  if (error) return <div>{error}</div>;

  return (
    <div className="pets-container">
      <h2>Pet Profile</h2>
      {pet && (
        <div className="pet-details">
          <h3>Pet Details</h3>
          <p>ID: {pet.petId}</p>
          <p>Name: {pet.name}</p>
          <p>Species: {pet.species}</p>
          <p>Age: {pet.age}</p>
        </div>
      )}
      <div className="table-container">
        <h3>Medical Records</h3>
        {medicalRecords.length > 0 ? (
          <table className="pets-table">
            <thead>
              <tr>
                
                <th>Diagnosis</th>
                <th>Treatment</th>
                <th>Medications</th>
              </tr>
            </thead>
            <tbody>
              {medicalRecords.map((record) => (
                <tr key={record._id}>
                  
                  <td>{record.diagnosis}</td>
                  <td>{record.treatment}</td>
                  <td className="medications">
                    {record.medications.map((med, index) => (
                      <div key={index}>{med.name} ({med.dosage})</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No medical records found</p>
        )}
      </div>
      <div className="table-container">
        <h3>Vaccinations</h3>
        {vaccinations.length > 0 ? (
          <table className="pets-table">
            <thead>
              <tr>
                
                <th>Vaccine</th>
                <th>Date Given</th>
              </tr>
            </thead>
            <tbody>
              {vaccinations.map((vaccination) => (
                <tr key={vaccination._id}>
                  
                  <td>{vaccination.vaccine}</td>
                  <td>{new Date(vaccination.dateGiven).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No vaccinations found</p>
        )}
      </div>
      <div className="table-container">
        <h3>Visits</h3>
        {visits.length > 0 ? (
          <table className="pets-table">
            <thead>
              <tr>
                
                <th>Date</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit) => (
                <tr key={visit._id}>
                  
                  <td>{new Date(visit.date).toLocaleDateString()}</td>
                  <td>{visit.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No visits found</p>
        )}
      </div>
    </div>
  );
};

export default ParentPets;
