// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import ParentDashboard from './components/ParentDashboard';
import VetDashboard from './components/VetDashboard';
import PetProfile from './components/PetProfile';
import ParentPets from './components/ParentPets'
import MedicalRecords from './components/MedicalRecords';
import Vaccinations from './components/Vaccinations';
import Visits from './components/Visits';
import MedicalRecordsList from './components/MedicalRecordsList';
import VisitsList from './components/VisitsList'; // Import the new component
import ParentPetProfile from './components/ParentPetProfile';
import Patients from './components/Patients';
import VaccinationList from './components/VaccinationList';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/parent-dashboard/*" element={<ParentDashboard />} />
          <Route path="/vet-dashboard/*" element={<VetDashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/medical-records" element={<MedicalRecordsList />} />
          <Route path="/visits" element={<VisitsList />} /> {/* Add the new route */}
          <Route path="/vaccinations" element={<VaccinationList />} />
          <Route path="/parent-pet-profile/:petId" element={<ParentPets />} />
          <Route path="/parent-pet-profile/:petId" element={<ParentPetProfile />} />
          <Route path="/pet-profile/:petId" element={<PetProfile />} />
          <Route path="/pet-profile/:petId/medical-records" element={<MedicalRecords />} />
          <Route path="/pet-profile/:petId/vaccinations" element={<Vaccinations />} />
          <Route path="/pet-profile/:petId/visits" element={<Visits />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
