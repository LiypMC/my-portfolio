import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4">
      <ul className="flex justify-center space-x-6">
        <li><NavLink to="/" className={({ isActive }) => isActive ? "font-bold" : ""}>Home</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? "font-bold" : ""}>About</NavLink></li>
        <li><NavLink to="/projects" className={({ isActive }) => isActive ? "font-bold" : ""}>Projects</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? "font-bold" : ""}>Contact</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;