import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1,
        staggerDirection: 1
      }
    }
  };

  const itemVariants = {
    closed: { y: -20, opacity: 0 },
    open: { y: 0, opacity: 1 }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled 
          ? (isDarkMode 
            ? 'bg-gray-900/90 backdrop-blur-md shadow-md' 
            : 'bg-white/90 backdrop-blur-md shadow-md') 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center">
          <motion.div 
            className={`p-2 rounded-lg mr-2 ${isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Code size={22} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
          </motion.div>
          <motion.span 
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.03 }}
          >
            Naol
          </motion.span>
        </NavLink>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => `
                  relative text-sm font-medium py-2 px-1
                  ${isActive 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-semibold' 
                    : (isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black')
                  }
                  after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-purple-500
                  after:transition-all after:duration-300
                  ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                `}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <motion.button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full ${
              isDarkMode 
                ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } hover-glow`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          <div className="md:hidden">
            <motion.button 
              onClick={toggleMenu}
              className={`p-2.5 rounded-full ${
                isDarkMode 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              } hover-glow`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden mt-4 overflow-hidden"
          >
            <div className={`rounded-xl p-2 ${isDarkMode ? 'glass-dark' : 'glass'} backdrop-blur-lg shadow-lg`}>
              {navItems.map((item) => (
                <motion.div key={item.path} variants={itemVariants}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      block px-4 py-3 rounded-lg my-1 transition-all
                      ${isActive 
                        ? (isDarkMode 
                          ? 'bg-blue-600/20 text-blue-400 font-semibold' 
                          : 'bg-blue-50 text-blue-600 font-semibold') 
                        : (isDarkMode 
                          ? 'text-gray-300 hover:bg-gray-800/50' 
                          : 'text-gray-700 hover:bg-gray-200')
                      }
                    `}
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;