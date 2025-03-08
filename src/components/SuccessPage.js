import React, { useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const SuccessPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);
  
  useEffect(() => {
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
          rounded-xl shadow-xl p-8 text-center`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={32} className="text-green-500" />
        </motion.div>
        
        <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Thank You!
        </h1>
        <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Your donation has been successfully processed. Your support means a lot and helps me continue creating content!
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Return to Home
        </motion.button>
        
        <p className={`text-sm mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          You'll be automatically redirected in a few seconds...
        </p>
      </motion.div>
    </div>
  );
};

export default SuccessPage; 