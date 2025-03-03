// src/components/ParentPetProfile.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ParentPetProfile.css';

const ParentPetProfile = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pets/${petId}`);
        setPet(response.data);
      } catch (error) {
        console.error('Error fetching pet:', error);
      }
    };

    fetchPet();
  }, [petId]);

  if (!pet) return <div>Loading...</div>;

  return (
    <div className="pet-profile">
      <h2>Pet Profile</h2>
      <div className="pet-details">
        <p><strong>Pet ID:</strong> {pet.petId}</p>
        <p><strong>Name:</strong> {pet.name}</p>
        <p><strong>Species:</strong> {pet.species}</p>
        <p><strong>Age:</strong> {pet.age}</p>
        <p><strong>Owner Email:</strong> {pet.ownerId.email}</p>
      </div>
      <div className="floating-panels">
      <Link to={`/parent-pet-profile/${petId}/medical-records`} className="panel medical-records">
  <h3>Medical Records</h3>
</Link>
<Link to={`/parent-pet-profile/${petId}/vaccinations`} className="panel vaccinations">
  <h3>Vaccinations</h3>
</Link>
<Link to={`/parent-pet-profile/${petId}/visits`} className="panel visits">
  <h3>Visits</h3>
</Link>

      </div>
    </div>
  );
};

export default ParentPetProfile;
