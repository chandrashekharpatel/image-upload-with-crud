import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Home from '../Home';

const AddItems = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/items', { name, description });
      // Show alert when item is added successfully
      alert('Item added successfully!');
      // Redirect to 'viewItems' page after successful submission
      navigate('/items');
      // Reset form fields after successful submission
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding item:', error);
      // Optionally, you can handle errors here (e.g., show an error message)
    }
  };

  return (
    <div>
      <Home />
      <div className='container'>
        <h2>Add Items</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name" className="form-control-label mb-1">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description" className="form-control-label mb-1">Description:</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Item</button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
