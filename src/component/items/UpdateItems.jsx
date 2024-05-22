import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import Home from '../Home';

const UpdateItems = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch item details by ID when the component mounts
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/items/${id}`);
      const item = response.data;
      setName(item.name);
      setDescription(item.description);
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8081/items/${id}`, {
        name,
        description
      });
      // Show alert when item is updated successfully
      alert('Item updated successfully!');
      // Redirect to 'viewItems' page after successful update
      navigate('/items');
    } catch (error) {
      console.error('Error updating item:', error);
      // Optionally, handle errors (e.g., show an error message)
    }
  };

  return (
    <div>
      <Home />
      <div className="container mt-2">
        <h2>Update Item</h2>
        <div className="form-group">
          <label htmlFor="itemName">Name:</label>
          <input
            type="text"
            className="form-control mb-2"
            id="itemName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="itemDescription">Description:</label>
          <input
            type="text"
            className="form-control"
            id="itemDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* Hidden input field for the item ID */}
        <input type="hidden" value={id} />
        <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default UpdateItems;
