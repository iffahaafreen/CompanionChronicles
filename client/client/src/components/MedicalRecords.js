import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MedicalRecords.css'; // Ensure this file exists and is correctly imported

const MedicalRecords = () => {
  const { petId } = useParams();
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [updatedRecord, setUpdatedRecord] = useState({
    recordId: '', 
    diagnosis: '',
    treatment: '',
    medications: []
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pets/${petId}/medical-records`);
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    };

    fetchRecords();
  }, [petId]);

  const handleEditClick = (record) => {
    setEditingRecord(record);
    setUpdatedRecord({
      recordId: record.recordId,
      diagnosis: record.diagnosis,
      treatment: record.treatment,
      medications: record.medications
    });
    setIsFormVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleMedicationChange = (index, e) => {
    const { name, value } = e.target;
    const newMedications = [...updatedRecord.medications];
    newMedications[index] = { ...newMedications[index], [name]: value };
    setUpdatedRecord((prev) => ({ ...prev, medications: newMedications }));
  };

  const handleSaveClick = async () => {
    const payload = {
      recordId: updatedRecord.recordId,
      diagnosis: updatedRecord.diagnosis,
      treatment: updatedRecord.treatment,
      medications: updatedRecord.medications
    };
  
    try {
      const response = await axios.post(`http://localhost:5000/pets/${petId}/medical-records`, payload);
      setRecords((prev) => [...prev, response.data]);
      setUpdatedRecord({ recordId: '', diagnosis: '', treatment: '', medications: [] });
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error adding medical record:', error);
    }
  };
  

  return (
    <div className="medical-records-container">
      <h2>Medical Records</h2>
      <table className="records-table">
        <thead>
          <tr>
            <th>Diagnosis</th>
            <th>Treatment</th>
            <th>Medications</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id} onClick={() => handleEditClick(record)}>
              <td>{record.diagnosis}</td>
              <td>{record.treatment}</td>
              <td>
                {record.medications.map((medication, index) => (
                  <div key={index}>
                    {medication.name} ({medication.dosage})
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => { setEditingRecord(null); setIsFormVisible(true); }}>Add New Record</button>
      {isFormVisible && (
        <div className="edit-form">
          <h3>{editingRecord ? 'Edit Medical Record' : 'Add Medical Record'}</h3>
          <label>
            Record ID:
            <input
              type="text"
              name="recordId"
              value={updatedRecord.recordId}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Diagnosis:
            <input
              type="text"
              name="diagnosis"
              value={updatedRecord.diagnosis}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Treatment:
            <input
              type="text"
              name="treatment"
              value={updatedRecord.treatment}
              onChange={handleInputChange}
            />
          </label>
          <div>
            <h4>Medications</h4>
            {updatedRecord.medications.map((medication, index) => (
              <div key={index} className="medication-form">
                <label>
                  Medication Name:
                  <input
                    type="text"
                    name="name"
                    value={medication.name}
                    onChange={(e) => handleMedicationChange(index, e)}
                  />
                </label>
                <label>
                  Dosage:
                  <input
                    type="text"
                    name="dosage"
                    value={medication.dosage}
                    onChange={(e) => handleMedicationChange(index, e)}
                  />
                </label>
              </div>
            ))}
            <button onClick={() => setUpdatedRecord((prev) => ({
              ...prev,
              medications: [...prev.medications, { name: '', dosage: '' }]
            }))}>Add Medication</button>
          </div><br></br>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={() => setIsFormVisible(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;
 