import React, { useState } from 'react';
import axios from '../api';
import './Auth.css';
import Header from './Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/login', { email, password });
      const { token, role } = response.data;
      console.log(response.data);
    
      localStorage.setItem('token', token); // Store token
      localStorage.setItem('user.email', email);
      // Redirect based on role
      if (role === 'parent') {
        window.location.href = '/parent-dashboard';
      } else if (role === 'vet') {
        window.location.href = '/vet-dashboard';
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="auth-page">
      <Header />
      <div className="auth-container">
        <h2>Login</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
