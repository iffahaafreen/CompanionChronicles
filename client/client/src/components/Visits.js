import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Visits.css'; // Ensure this file exists and is correctly imported

const Visits = () => {
  const { petId } = useParams();
  const [visits, setVisits] = useState([]);
  const [editingVisit, setEditingVisit] = useState(null);
  const [updatedVisit, setUpdatedVisit] = useState({
    visitId: '',
    date: '',
    reason: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pets/${petId}/visits`);
        setVisits(response.data);
      } catch (error) {
        console.error('Error fetching visits:', error);
      }
    };

    fetchVisits();
  }, [petId]);

  const handleEditClick = (visit) => {
    setEditingVisit(visit);
    setUpdatedVisit({
      visitId: visit.visitId,
      date: visit.date,
      reason: visit.reason
    });
    setIsFormVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVisit((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    const payload = {
      visitId: updatedVisit.visitId,
      date: updatedVisit.date,
      reason: updatedVisit.reason
    };

    try {
      const response = await axios.post(`http://localhost:5000/pets/${petId}/visits`, payload);
      setVisits((prev) => [...prev, response.data]);
      setUpdatedVisit({ visitId: '', date: '', reason: '' });
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error adding visit:', error);
    }
  };

  return (
    <div className="visits-container">
      <h2>Visits</h2>
      <table className="visits-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((visit) => (
            <tr key={visit._id} onClick={() => handleEditClick(visit)}>
              <td>{new Date(visit.date).toLocaleDateString()}</td>
              <td>{visit.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => { setEditingVisit(null); setIsFormVisible(true); }}>Add New Visit</button>
      {isFormVisible && (
        <div className="edit-form">
          <h3>{editingVisit ? 'Edit Visit' : 'Add Visit'}</h3>
          <label>
            Visit ID:
            <input
              type="text"
              name="visitId"
              value={updatedVisit.visitId}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={updatedVisit.date}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Reason:
            <input
              type="text"
              name="reason"
              value={updatedVisit.reason}
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

export default Visits;
