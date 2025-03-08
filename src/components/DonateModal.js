import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_51R0IXABGna2WXkSDIS8xxw8XN6OCAJPz2f97f5cvZiBRYxHYWbiROyXJUjbsYwbg3ftCmnoKIcnhRtzvwnvGhWtc00JcGN8Uoy');

// Backend URL - will be different in production vs. development
const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? 'https://backend-server-iota-eight.vercel.app' // Replace with your deployed backend URL
  : 'http://localhost:4000';

const DonateModal = ({ onClose, isDarkMode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Redirect to Stripe checkout immediately when component mounts
  useEffect(() => {
    console.log('DonateModal mounted, initiating Stripe redirect');
    console.log('Using backend URL:', BACKEND_URL);
    console.log('Stripe publishable key available:', !!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    
    // Default donation amount
    const defaultAmount = 10;
    
    const redirectToStripe = async () => {
      setIsLoading(true);
      try {
        console.log('Creating Stripe checkout session...');
        // Create a checkout session via our backend
        const response = await fetch(`${BACKEND_URL}/create-checkout-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: defaultAmount }),
        });
        
        console.log('Backend response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Backend error response:', errorText);
          let errorData;
          try {
            errorData = JSON.parse(errorText);
          } catch (e) {
            errorData = { details: errorText };
          }
          throw new Error(errorData.details || `Failed to create checkout session: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Checkout session created:', data.id ? 'Success' : 'Failed');
        
        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        console.log('Redirecting to Stripe checkout...');
        const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
        
        if (error) {
          console.error('Stripe redirect error:', error);
          throw new Error(error.message);
        }
      } catch (err) {
        console.error('Stripe checkout error:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    redirectToStripe();
    
    // Clean up function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // If there's an error, show a simplified error modal
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className={`w-full max-w-md p-6 rounded-xl ${
            isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'
          } shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg mr-2 ${
                isDarkMode ? 'bg-red-600/20' : 'bg-red-100'
              }`}>
                <Heart size={20} className="text-red-500" />
              </div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Payment Error
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className={`p-2 rounded-full ${
                isDarkMode ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              <X size={18} />
            </motion.button>
          </div>
          
          <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
          
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            There was a problem connecting to our payment provider. Please try again later or contact support.
          </p>
          
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    );
  }

  // Show loading indicator while attempting to redirect
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="p-8 rounded-xl bg-white dark:bg-gray-900 shadow-2xl flex flex-col items-center"
        >
          <div className="animate-spin h-10 w-10 mb-4 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="text-gray-800 dark:text-gray-200 font-medium">Connecting to payment service...</p>
        </motion.div>
      </motion.div>
    );
  }

  // Return null if no error and not loading (redirect should happen)
  return null;
};

export default DonateModal; 