import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import header from '../images/header.png';
import user1 from '../images/user1.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container mt-3'>
      <div className="d-flex align-items-center justify-content-between ">
        <div>
          <img src={user1} alt="Logo" className="mr-3" style={{ height: '90px' }} />
        </div>
        <div>
          <img src={header} alt="Header" style={{ height: '90px', width:'848px' }} />
        </div>
      </div>

      <nav className="navbar navbar-expand-sm bg-light navbar-light" >
        <div className="container">
          <a className="navbar-brand" href="/home">Home</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Items
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <Link className="dropdown-item" to="/add-items">Add Items</Link>
                  <Link className="dropdown-item" to="/items">View Items</Link>
                </div>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/add-items">Add Items</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/items">View Items</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/add-product">Add Product</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/products">View Product</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/add-image">Add Image</a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="/images">View Image</a>
              </li> */}
              {/* <li className="nav-item">
                <a className="nav-link" href="/add-simcard">Add SimCard</a>
              </li> */}
               {/* <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="/view">View Image</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Home;
