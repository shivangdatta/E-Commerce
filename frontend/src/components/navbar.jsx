import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import './navbar.css';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { searchTerm, priceRange, handleSearchChange, handlePriceFilterChange, userEmail, logout } = useStateContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className='navbar'>
      <div className='links'>
        <select className='dropdown' value={priceRange} onChange={(e) => handlePriceFilterChange(e.target.value)}>
          <option value='all'>All Prices</option>
          <option value='0-199'>$0 - $199</option>
          <option value='200-399'>$200 - $399</option>
          <option value='400-599'>$400 - $599</option>
          <option value='600-799'>$600 - $799</option>
          <option value='800-999'>$800 - $999</option>
          <option value='1000'>$1000 and Above</option>
        </select>
        <input
          className='search'
          type='text'
          placeholder='Search'
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <Link to="/">Shop</Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
        {userEmail ? (
          <>
            <h2>Welcome, {userEmail}</h2>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;