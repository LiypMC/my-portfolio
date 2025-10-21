import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe only when a publishable key is configured so we never
// accidentally fall back to the Stripe test environment.
const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;
const fallbackPriceId = process.env.REACT_APP_STRIPE_PRICE_ID;

// Backend URL - defaults to the hosted donations API when not provided
const BACKEND_URL = process.env.REACT_APP_DONATIONS_API_URL
  || (process.env.NODE_ENV === 'production'
    ? 'https://donate.naol.pro'
    : 'http://localhost:4000');

const DonateModal = ({ onClose, isDarkMode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Default donation amount
  const defaultAmount = 10;
  
  // Define redirectToStripe outside useEffect so it can be used elsewhere
  const fallbackSuccessUrl =
    process.env.REACT_APP_STRIPE_SUCCESS_URL || `${window.location.origin}/success`;
  const fallbackCancelUrl =
    process.env.REACT_APP_STRIPE_CANCEL_URL || `${window.location.origin}/cancel`;

  const redirectWithClientOnlyCheckout = async () => {
    if (!stripePromise) {
      throw new Error('Stripe publishable key is not configured for fallback checkout.');
    }

    if (!fallbackPriceId) {
      throw new Error('Stripe price ID is not configured for fallback checkout.');
    }

    const stripe = await stripePromise;
    const { error: redirectError } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: fallbackPriceId,
          quantity: Math.max(1, Math.floor(defaultAmount / 10)),
        },
      ],
      mode: 'payment',
      successUrl: fallbackSuccessUrl,
      cancelUrl: fallbackCancelUrl,
    });

    if (redirectError) {
      throw new Error(redirectError.message);
    }
  };

  const redirectToStripe = async () => {
    setIsLoading(true);
    setError(null);
    const shouldFallbackToClientCheckout = () =>
      Boolean(fallbackPriceId && publishableKey);

    try {
      console.log('Creating Stripe checkout session...');
      // Create a checkout session via our backend
      const response = await fetch(`${BACKEND_URL}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: defaultAmount,
        }),
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
      console.log('Checkout session created:', data.id || data.url ? 'Success' : 'Failed');

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      if (!stripePromise) {
        throw new Error('Stripe publishable key is not configured and the API did not return a redirect URL.');
      }

      if (!data.id) {
        throw new Error('Stripe checkout session could not be created.');
      }

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

      const errorMessage = err?.message || '';
      const priceMissing = /No such price/i.test(errorMessage);
      const networkError = /Failed to fetch/i.test(errorMessage) || err?.name === 'TypeError';

      if ((priceMissing || networkError) && shouldFallbackToClientCheckout()) {
        console.log('Falling back to client-only Stripe checkout with configured price ID.');
        try {
          await redirectWithClientOnlyCheckout();
          return;
        } catch (fallbackError) {
          console.error('Fallback checkout failed:', fallbackError);
          setError(fallbackError.message);
          setIsLoading(false);
          return;
        }
      }

      if (!shouldFallbackToClientCheckout() && priceMissing) {
        setError(
          'The configured Stripe price ID could not be found. Update your donations API or configure REACT_APP_STRIPE_PRICE_ID for fallback checkout.'
        );
      } else {
        setError(errorMessage || 'Unable to start the donation checkout.');
      }

      setIsLoading(false);
    }
  };
  
  // Redirect to Stripe checkout immediately when component mounts
  useEffect(() => {
    console.log('DonateModal mounted, initiating Stripe redirect');
    console.log('Using backend URL:', BACKEND_URL);
    console.log('Stripe publishable key available:', !!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    
    // Run the redirect immediately on mount
    redirectToStripe();
    
    // Clean up function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // If there's an error, show a modern error modal
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className={`w-full max-w-sm p-8 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-white'} shadow-2xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Card header with alert icon */}
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'}`}>
              <svg className="w-8 h-8 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
          </div>
          
          {/* Title with gradient text */}
          <h3 className={`text-center text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-600">
              Payment Connection Error
            </span>
          </h3>
          
          {/* Error message box with modern styling */}
          <div className={`mb-5 p-4 rounded-xl text-sm ${isDarkMode ? 'bg-red-900/20 text-red-300 border border-red-800/50' : 'bg-red-50 text-red-600 border border-red-100'}`}>
            <div className="font-medium mb-1">Error details:</div>
            <div className="font-mono text-xs overflow-auto max-h-24">{error}</div>
          </div>
          
          {/* Server status */}
          <div className={`mb-6 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p className="mb-2">Potential causes:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Backend server not running at <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">{BACKEND_URL}</code></li>
              <li>Stripe API key not configured properly</li>
              <li>Network connectivity issues</li>
              <li>CORS policy restrictions</li>
            </ul>
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} transition-colors`}
            >
              Close
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setError(null);
                setIsLoading(true);
                setTimeout(() => redirectToStripe(), 500);
              }}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all"
            >
              Try Again
            </motion.button>
          </div>
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
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className={`w-full max-w-sm p-8 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-white'} shadow-2xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
        >
          {/* Card header with pulse effect */}
          <div className="flex justify-center mb-6">
            <motion.div 
              className={`p-4 rounded-full ${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}
              animate={{ 
                boxShadow: [
                  `0 0 0 0 ${isDarkMode ? 'rgba(147, 51, 234, 0.7)' : 'rgba(168, 85, 247, 0.4)'}`, 
                  `0 0 0 10px ${isDarkMode ? 'rgba(147, 51, 234, 0)' : 'rgba(168, 85, 247, 0)'}`
                ],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <svg className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </motion.div>
          </div>

          {/* Title with gradient text */}
          <h3 className={`text-center text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Connecting to Stripe
            </span>
          </h3>
          
          {/* Status message */}
          <p className={`text-center mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
            Preparing your secure payment connection...
          </p>
          
          {/* Loading animation */}
          <div className="flex justify-center items-center mb-4">
            <div className="relative">
              {/* Outer ring */}
              <motion.div 
                className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-700"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner spinning gradient ring */}
              <motion.div 
                className="absolute top-0 left-0 w-16 h-16 rounded-full border-t-2 border-l-2 border-r-2 border-transparent"
                style={{ 
                  borderTopColor: '#8B5CF6', 
                  borderRightColor: '#3B82F6', 
                  borderLeftColor: '#EC4899',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full" />
            </div>
          </div>
          
          {/* Security note */}
          <div className={`flex items-center justify-center mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
            <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Secure payment powered by Stripe</span>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Return null if no error and not loading (redirect should happen)
  return null;
};

export default DonateModal; 