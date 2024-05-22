import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import Home from '../Home';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/products/${id}`);
      alert('Product deleted successfully!');
      setProducts(products.filter(product => product.productId !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <Home />
      <div className='container'>
        <h2>Products</h2>
        {/* <Link to="/products/add" className="btn btn-primary mb-3">Add Product</Link> */}
        <table className="table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Item ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.itemId}</td>
                <td>
                  {/* <Link to={`/products/${product.productId}`} className="btn btn-info mr-2">View</Link> */}
                  <Link to={`/update-product/${product.productId}`} className="btn btn-primary mr-2">Update</Link>
                  &nbsp; &nbsp; &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this product?')) {
                        handleDelete(product.productId);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProducts;
