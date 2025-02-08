import React from 'react';
import '../Styles/Navbar.css';
import { Link } from 'react-router-dom'; // Correct import for react-router-dom

const Navbar = () => {
  return (
    <>
      <div className='mainheader'>
        <header className="header">
          <a className='logos'> TrendTide</a>
           
          
          <nav className="nav">
            <a href="#how-it-works">How it works</a>
            <a href="#dashboard">Dashboard</a>
            <Link to="/aboutus">About Us</Link>
          </nav>
          <Link className="demo-button" to="/signin">Sign In</Link>
        </header>
      </div>
    </>
  );
}

export default Navbar;
