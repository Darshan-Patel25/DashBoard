import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-[#f4f7fb] shadow-md sticky top-0 z-50 font-serif">
      <header className="flex justify-between items-center px-10 py-5">
        <a className="text-2xl font-bold text-[#456EC8] font-lato">Trendify</a>

        <nav className="flex gap-8 text-lg font-medium">
        <Link to="/" className="text-[#456EC8] ">
            Home
          </Link>
          <a href="/dashboard" className="text-gray-700 hover:text-[#456EC8]">
            Dashboard
          </a>
          <Link to="/aboutus" className="text-gray-700 hover:text-[#456EC8]">
            About Us
          </Link>
        </nav>

        <Link
          className="bg-[#456EC8] text-white px-5 py-2 rounded-md border-none font-medium text-lg cursor-pointer transition-colors duration-200 hover:bg-[#5593D7]"
          to="/signin"
        >
          Sign In
        </Link>
      </header>
    </div>
  );
};

export default Navbar;
