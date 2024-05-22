import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import Home from '../Home';

const UpdateProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [productName, setProductName] = useState('');
  const [itemId, setItemId] = useState('');
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/products/${id}`);
        const product = response.data;
        setProductName(product.productName);
        setItemId(product.itemId);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8081/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchProduct();
    fetchItems();
  }, [id]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/products/${id}`, { productName, itemId });
      alert('Product updated successfully!');
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <Home />
      <div className='container'>
        <h2>Update Product</h2>
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
          <button type="submit" className="btn btn-primary">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
