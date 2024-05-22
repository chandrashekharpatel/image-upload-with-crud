import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Home from '../Home';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [itemId, setItemId] = useState('');
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8081/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/products', { productName, itemId });
      alert('Product added successfully!');
      navigate('/products');
      setProductName('');
      setItemId('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <Home />
      <div className='container'>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="productName" className="form-control-label mb-1">Product Name:</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="itemId" className="form-control-label mb-1">Select Item:</label>
            <select
              className="form-control"
              id="itemId"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
            >
              <option value="">Select Item</option>
              {items.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
