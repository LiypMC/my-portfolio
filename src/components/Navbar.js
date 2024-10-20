import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-gray-900 text-white p-4 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold">Naol</NavLink>
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `hover:text-blue-400 transition duration-300 ${isActive ? 'text-blue-400 font-bold' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block py-2 px-4 hover:bg-gray-800 ${isActive ? 'bg-gray-800 font-bold' : ''}`
              }
              onClick={toggleMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;