// src/components/Pets.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pets = ({ onSelectPet }) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('/api/pet');
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  return (
    <div>
      <h2>Pets</h2>
      <ul>
        {pets.map(pet => (
          <li key={pet.petId} onClick={() => onSelectPet(pet.petId)}>
            {pet.name} - {pet.species}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pets;
