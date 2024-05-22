import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Home from '../Home';

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Number of items to display per page

  useEffect(() => {
    fetchItems();
  }, [currentPage]); // Refetch items when the current page changes

  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/items?page=${currentPage}&limit=${itemsPerPage}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // If search query is empty, fetch all items
      fetchItems();
      return;
    }

    setLoading(true);
    try {
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      const response = await axios.get(`http://localhost:8081/items/search?query=${encodedQuery}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error searching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/items/${id}`);
      // Remove the deleted item from the state
      setItems(items.filter(item => item.id !== id));
      console.log('Item deleted successfully:', id);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Pagination
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div className=''>
      <Home />
      <div className="container ">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>View All Items</h2>
          <div className="d-flex">
            <div className='p-2'>
              <input
                type="text"
                placeholder="Search items"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control mr-2"
              />
            </div>
            <div className='p-2'>
              <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <Link to={`/update-items/${item.id}`} className="btn btn-primary mr-2">Update</Link>
                  &nbsp; &nbsp; &nbsp;
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-info" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <div>Page {currentPage} of {totalPages}</div> 
          <button className="btn btn-info" onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default ViewItems;
