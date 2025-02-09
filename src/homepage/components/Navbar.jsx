import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <header className="flex justify-between items-center px-10 py-5">
        <a className="text-2xl font-bold text-indigo-600">TrendTide</a>

        <nav className="flex gap-8 text-lg font-medium">
          <a href="#how-it-works" className="text-gray-700 hover:text-blue-500">
            How it works
          </a>
          <a href="/dashboard" className="text-gray-700 hover:text-blue-500">
            Dashboard
          </a>
          <Link to="/aboutus" className="text-gray-700 hover:text-blue-500">
            About Us
          </Link>
        </nav>

        <Link
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-lg font-semibold hover:bg-blue-700"
          to="/signin"
        >
          Sign In
        </Link>
      </header>
    </div>
  );
};

export default Navbar;
