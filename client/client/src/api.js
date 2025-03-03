import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// Get all pets for the authenticated user
export const getUserPets = async (token) => {
  return API.get('/me/pets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get a specific pet by ID
export const getPetById = async (petId, token) => {
  return API.get(`/me/pets/${petId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get medical records for a specific pet
export const getMedicalRecords = async (petId, token) => {
  return API.get(`/me/pets/${petId}/medical-records`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get vaccinations for a specific pet
export const getVaccinations = async (petId, token) => {
  return API.get(`/me/pets/${petId}/vaccinations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get visits for a specific pet
export const getVisits = async (petId, token) => {
  return API.get(`/me/pets/${petId}/visits`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default API;
