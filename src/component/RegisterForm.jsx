import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/auth/register', { username, password });
      // Handle successful registration
      alert('Registration successful!');
      navigate('/');
      // Clear text fields
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error registering:', error);
      // Handle registration error (show error message, clear form fields, etc.)
    }
  };

  return (
    <div className="container mt-5">
      <form className="form-signin" onSubmit={handleSubmit}>
        <h2 className="form-signin-heading">Please register</h2>
        <label htmlFor="username" className="sr-only mb-2">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          className="form-control mb-2"
          placeholder="Username"
          required
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password" className="sr-only mb-2">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control mb-2"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="d-flex">
            <div className='p-2'>
              <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            </div>
            <div className='p-2'>
              <Link to="/" className="btn btn-lg btn-secondary btn-block">Sign-in</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
