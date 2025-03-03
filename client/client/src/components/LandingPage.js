import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; 

const LandingPage = () => {
  return (
    <div className="landing-container">
      <img src="/logo.png" alt="CompanionChronicles Logo" className=".logo" />
      <div className="button-container">
        <Link to="/login" className="button">Login</Link> <br></br>
        <Link to="/register" className="button">Register</Link>
      </div>
    </div>
  );
};

export default LandingPage;
