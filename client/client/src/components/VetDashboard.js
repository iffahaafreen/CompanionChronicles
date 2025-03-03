import React, { useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import VetNavBar from './VetNavBar';
import Patients from './Patients';
//import MedicalRecordsList from './MedicalRecordsList';
//import MedicalRecords from './MedicalRecords';
import Vaccinations from './Vaccinations';
import VaccinationList from './VaccinationList';
import Visits from './Visits';
import VisitsList from './VisitsList';
import PetProfile from './PetProfile';
import './VetDashboard.css';

const VetDashboard = () => {
  const [selectedPetId, setSelectedPetId] = useState(null);

  const handlePetSelection = (petId) => {
    setSelectedPetId(petId);
  };

  return (
    <div className="vet-dashboard">
      <VetNavBar />
      <div className="vet-content">
        <Routes>
          <Route path="patients" element={<Patients onSelectPet={handlePetSelection} />} />
          <Route path="vaccinations" element={<VaccinationList />} />
          <Route path="visits" element={<VisitsList />} />

          <Route
            path="pet-profile"
            element={
              selectedPetId ? (
                <div className="pet-profile-container">
                  <div className="pet-details">
                    <h2>Pet Profile</h2>
                    <button onClick={() => setSelectedPetId(null)}>Back to Patients</button>
                  </div>
                  <div className="floating-panels">
                    <div className="panel vaccinations">
                      <h3>Vaccinations</h3>
                      <Link to="vaccinations"><Vaccinations petId={selectedPetId} /></Link>
                    </div>
                    <div className="panel visits">
                      <h3>Visits</h3>
                      <Link to="visits"><Visits petId={selectedPetId} /></Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Navigate to="/vet-dashboard/patients" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default VetDashboard;
