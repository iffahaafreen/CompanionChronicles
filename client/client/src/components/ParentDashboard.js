// src/components/ParentDashboard.js

import React, { useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import ParentPetProfile from './ParentPetProfile'; // Import the updated PetProfile component
import './ParentDashboard.css';

const ParentDashboard = () => {
  const [petId, setPetId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/pets/${petId}`);
      const data = await response.json();
      setSearchResults([data]); // Set results to an array with a single pet object
    } catch (error) {
      console.error('Error fetching pet:', error);
    }
  };
  

  const handlePetSelection = (petId) => {
    setSelectedPetId(petId);
  };

  return (
    <div className="parent-dashboard">
      <div className="parent-content">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={petId}
            onChange={(e) => setPetId(e.target.value)}
            placeholder="Enter Pet ID"
          />
          <button type="submit">Search</button>
        </form>
        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>Search Results</h3>
            <table>
              <thead>
                <tr>
                  <th>Pet ID</th>
                  <th>Name</th>
                  <th>Species</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((pet) => (
                  <tr key={pet.petId}>
                    <td>{pet.petId}</td>
                    <td>{pet.name}</td>
                    <td>{pet.species}</td>
                    <td>{pet.age}</td>
                    <td>
                      <Link to={`/parent-pet-profile/${pet.petId}`}>
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/parent-dashboard" />} />
          <Route path="parent-pet-profile/:petId" element={<ParentPetProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default ParentDashboard;
