// src/components/NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="floating-panels">
      <Link to="/parent-dashboard/pets" className="panel">
        Pets
      </Link>
      <Link to="/parent-dashboard/medical-records" className="panel">
        Medical Records
      </Link>
      <Link to="/parent-dashboard/vaccinations" className="panel">
        Vaccinations
      </Link>
      <Link to="/parent-dashboard/visits" className="panel">
        Visits
      </Link>
    </div>
  );
};

export default NavBar;
