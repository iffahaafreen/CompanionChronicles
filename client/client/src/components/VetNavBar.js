import React from 'react';
import { Link } from 'react-router-dom';
import './VetNavBar.css';

const VetNavBar = () => {
  return (
    <div className="vet-floating-panels">
      <Link to="/vet-dashboard/patients" className="vet-panel">
        Patients
      </Link>
      <Link to="/vet-dashboard/vaccinations" className="vet-panel">
        Vaccinations
      </Link>
      <Link to="/vet-dashboard/visits" className="vet-panel"> {/* Updated link to visits */}
        Visits
      </Link>
    </div>
  );
};

export default VetNavBar;
