import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/auth/login', { username, password });
      // Handle successful login (redirect, show success message, etc.)
      alert('Login successful!');
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error (show error message, clear form fields, etc.)
      alert('Please enter correct username and password!');
      // Redirect to signup page
      navigate('/');
    }
  };

  return (
    <div className="container mt-5">
      <form className="form-signin" onSubmit={handleSubmit}>
        <h2 className="form-signin-heading">Please sign in</h2>
        <div className='mb-2'>
          <label htmlFor="username" className="sr-only mb-2">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            placeholder="Username"
            required
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="password" className="sr-only mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex">
         <div className='p-2'>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </div>
        <div className='p-2'>
          <button className="btn btn-lg btn-secondary" onClick={() => navigate('/register')}>Sign up</button>
        </div>
        </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
