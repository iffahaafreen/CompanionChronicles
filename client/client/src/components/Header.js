import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isParent }) => {
  return (
    <div className="header">
      <Link to={isParent ? "/parent-dashboard" : "/vet-dashboard"} className="logo-link">
        <img src="/logo.png" alt="CompanionChronicles Logo" className="logo" />
      </Link>
    </div>
  );
};

export default Header;
