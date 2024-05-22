import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Home from '../Home';

const AddSIMCard = () => {
  const [number, setNumber] = useState('');
  const [provider, setProvider] = useState('');
  const [isActive, setIsActive] = useState(false); // State should be initialized with a boolean value
  const [citizenId, setCitizenId] = useState('');
  const [citizens, setCitizens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCitizens = async () => {
      try {
        const response = await axios.get('http://localhost:8081/citizens');
        setCitizens(response.data);
      } catch (error) {
        console.error('Error fetching citizens:', error);
      }
    };

    fetchCitizens();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/simcards', {
        number,
        provider,
        isActive,
        citizenId
      });
      alert('SIM Card added successfully!');
      navigate('/simcards');
      setNumber('');
      setProvider('');
      setIsActive(false);
      setCitizenId('');
    } catch (error) {
      console.error('Error adding SIM Card:', error);
    }
  };

  return (
    <div>
      <Home />
      <div className='container'>
        <h2>Add SIM Card</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="number" className="form-control-label mb-1">Telephone Number:</label>
            <input
              type="text"
              className="form-control"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="provider" className="form-control-label mb-1">Provider:</label>
            <input
              type="text"
              className="form-control"
              id="provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="isActive" className="form-control-label mb-1">Is Active:</label>
            <select
              className="form-control"
              id="isActive"
              value={isActive.toString()} // Convert boolean to string for select element
              onChange={(e) => setIsActive(e.target.value === 'true')}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="citizenId" className="form-control-label mb-1">Select Citizen:</label>
            <select
              className="form-control"
              id="citizenId"
              value={citizenId}
              onChange={(e) => setCitizenId(e.target.value)}
            >
              <option value="">Select Citizen</option>
              {citizens.map(citizen => (
                <option key={citizen.id} value={citizen.id}>{citizen.id}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Add SIM Card</button>
        </form>
      </div>
    </div>
  );
};

export default AddSIMCard;
