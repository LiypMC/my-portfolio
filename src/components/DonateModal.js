import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, CreditCard, Shield, CheckCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  useStripe
} from '@stripe/react-stripe-js';

// Stripe configuration
const stripePromise = loadStripe('pk_live_51S9P6SRWKWoGAyR5CagxSe1F2QDv3bsmJwUtZsac3buIjaIZLUxx5hJCHmuwKWNV3kO4gtf90EkupTYA8XQxOMLK005nIjaXfc');

const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com' 
  : 'http://localhost:4000';

// Payment form component
const PaymentForm = ({ amount, onSuccess, onError, isDarkMode }) => {
  const stripe = useStripe();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Use Stripe's hosted checkout with your existing price ID
      const { error: stripeError } = await stripe.redirectToCheckout({
        lineItems: [{
          price: 'price_1SKlNPRWKWoGAyR5lM8PGhZX', // Your existing price ID
          quantity: Math.max(1, Math.floor(amount / 10)), // Adjust quantity based on amount
        }],
        mode: 'payment',
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      });

      if (stripeError) {
        setError(stripeError.message);
        setIsProcessing(false);
      }
    } catch (err) {
      setError(err.message);
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Donation Amount:
            </span>
            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ${amount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={!stripe || isProcessing}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
          !stripe || isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/25'
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Donate ${amount.toFixed(2)}
          </div>
        )}
      </motion.button>

      <div className="flex items-center justify-center text-xs text-gray-500">
        <Shield className="w-4 h-4 mr-1" />
        Secured by Stripe
      </div>
    </form>
  );
};

// Main donation modal component
const DonateModal = ({ onClose, isDarkMode }) => {
  const [amount, setAmount] = useState(10);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const predefinedAmounts = [5, 10, 25, 50, 100];

  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount);
  };

  const handleCustomAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
  };

  const handlePaymentSuccess = (paymentIntent) => {
    setPaymentSuccess(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
  };

  const proceedToPayment = () => {
    if (amount >= 5) {
      // Simple redirect to Stripe payment link
      window.location.href = 'https://donate.stripe.com/aFabJ3aqh2dZ6pZfrb6AM00';
    }
  };

  // Reset body overflow when component unmounts
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (paymentSuccess) {
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
          className={`w-full max-w-md p-8 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-white'} shadow-2xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 15 }}
              className="flex justify-center mb-6"
            >
              <div className="p-4 bg-green-100 rounded-full">
                <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            </motion.div>
            
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600">
                Thank You!
            </span>
          </h3>
          
            <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your donation of <span className="font-semibold text-green-600">${amount.toFixed(2)}</span> has been processed successfully.
            </p>
            
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              This window will close automatically...
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

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
        className={`w-full max-w-md p-8 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-white'} shadow-2xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg mr-3">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Support My Work
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
          >
            <X className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </motion.button>
          </div>

        {/* Simple donation */}
        <div className="space-y-6">
          <div className="text-center">
            <div className={`p-6 rounded-lg mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$10</div>
              <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>One-time donation</div>
            </div>
          </div>

          {/* Single donation button */}
          <motion.button
            onClick={() => window.location.href = 'https://donate.stripe.com/aFabJ3aqh2dZ6pZfrb6AM00'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25"
          >
            Donate $10
          </motion.button>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center text-xs text-gray-500">
            <Shield className="w-4 h-4 mr-1" />
            <span>Your payment information is secure and encrypted</span>
          </div>
          </div>
        </motion.div>
      </motion.div>
    );
};

export default DonateModal; 