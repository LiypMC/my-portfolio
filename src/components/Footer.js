import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [year, setYear] = useState(new Date().getFullYear());
  
  const socialLinks = [
    { icon: <Github size={18} />, url: 'https://github.com/yourusername', name: 'GitHub' },
    { icon: <Twitter size={18} />, url: 'https://twitter.com/yourusername', name: 'Twitter' },
    { icon: <Linkedin size={18} />, url: 'https://linkedin.com/in/yourusername', name: 'LinkedIn' },
    { icon: <Mail size={18} />, url: 'mailto:dl.naolalemayehu@yahoo.com', name: 'Email' },
  ];

  // Update year if needed
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer 
      className={`py-12 px-6 md:px-10 relative z-10 ${
        isDarkMode 
          ? 'bg-gray-900 border-t border-gray-800' 
          : 'bg-gray-50 border-t border-gray-200'
      } transition-colors duration-300`}
      style={{ position: 'relative', zIndex: 10 }}
    >
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold gradient-text mb-4">Naol A. Demisse</h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Full Stack Developer & Data Scientist specialized in creating beautiful, functional, and user-centered digital experiences.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className={`p-2.5 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900'
                  } transition-colors`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Projects', path: '/projects' },
                { name: 'Contact', path: '/contact' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path}
                    className={`block py-1 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    } transition-colors`}
                  >
                    <motion.span whileHover={{ x: 5, display: 'inline-block' }}>
                      {item.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Services
            </h3>
            <ul className="space-y-2">
              {[
                'Web Development', 
                'Mobile Apps', 
                'UI/UX Design', 
                'Data Analysis', 
                'Machine Learning'
              ].map((item, index) => (
                <li key={index}>
                  <motion.span 
                    className={`block py-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {item}
                  </motion.span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Contact Info
            </h3>
            <div className="space-y-3">
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Addis Ababa, Ethiopia
              </p>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                +251 903968770
              </p>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                dl.naolalemayehu@yahoo.com
              </p>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className={`mt-12 pt-6 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} text-center`}
          variants={itemVariants}
        >
          <p className={`text-sm flex items-center justify-center ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            © {year} Naol A. Demisse. All rights reserved. Made with 
            <motion.span 
              className="text-red-500 mx-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                repeatType: "reverse"
              }}
            >
              <Heart size={14} fill="currentColor" />
            </motion.span> 
            in Addis Ababa
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;