import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Patients.css'; // Import the CSS file

const Patients = () => {
  const [pets, setPets] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [petId, setPetId] = useState('');
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pets');
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  const handleRowClick = (petId) => {
    navigate(`/pet-profile/${petId}`);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/pets/add-pet', {
        petId,
        name,
        species,
        age,
        ownerEmail
      });
      // Refresh the pets list after adding a new pet
      const response = await axios.get('http://localhost:5000/pets');
      setPets(response.data);
      // Hide the form and reset form fields
      setIsFormVisible(false);
      setPetId('');
      setName('');
      setSpecies('');
      setAge('');
      setOwnerEmail('');
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };

  return (
    <div className="patients-container">
      <h2>Patients List</h2>
      <table className="patients-table">
        <thead>
          <tr>
            <th>Pet ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.petId} onClick={() => handleRowClick(pet.petId)}>
              <td>{pet.petId}</td>
              <td>{pet.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-pet-button" onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Cancel' : 'Add Pet'}
      </button>
      {isFormVisible && (
        <div className="add-pet-form">
          <h2>Add New Pet</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              Pet ID:
              <input
                type="text"
                value={petId}
                onChange={(e) => setPetId(e.target.value)}
                required
              />
            </label>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Species:
              <input
                type="text"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
              />
            </label>
            <label>
              Age:
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </label>
            <label>
              Owner Email:
              <input
                type="email"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                required
              />
            </label>
            <button type="submit">Add Pet</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Patients;
