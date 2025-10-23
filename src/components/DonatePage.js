import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Heart, CreditCard, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

// Stripe configuration
const stripePromise = loadStripe('pk_live_51S9P6SRWKWoGAyR5CagxSe1F2QDv3bsmJwUtZsac3buIjaIZLUxx5hJCHmuwKWNV3kO4gtf90EkupTYA8XQxOMLK005nIjaXfc');

const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com' 
  : 'http://localhost:4000';

// Payment form component
const PaymentForm = ({ amount, onSuccess, onError, isDarkMode }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create payment intent
      const response = await fetch(`${BACKEND_URL}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'usd'
        }),
      });

      const { clientSecret, error: serverError } = await response.json();

      if (serverError) {
        throw new Error(serverError);
      }

      // Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (stripeError) {
        setError(stripeError.message);
        setIsProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent);
      }
    } catch (err) {
      setError(err.message);
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        '::placeholder': {
          color: '#ffffff50',
        },
        backgroundColor: 'transparent',
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-white/70">
            Card Information
          </label>
          <div className="p-4 rounded-lg border bg-white/5 backdrop-blur-sm border-white/10">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg text-sm backdrop-blur-sm"
          >
            {error}
          </motion.div>
        )}

        <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/70">
              Donation Amount:
            </span>
            <span className="font-semibold text-white">
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
            ? 'bg-white/5 cursor-not-allowed border border-white/5'
            : 'bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20'
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

      <div className="flex items-center justify-center text-xs text-white/50">
        <Shield className="w-4 h-4 mr-1" />
        Secured by Stripe
      </div>
    </form>
  );
};

// Main donation page component
const DonatePage = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
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
      navigate('/');
    }, 3000);
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
  };

  const proceedToPayment = () => {
    if (amount >= 5) {
      setShowPaymentForm(true);
    }
  };

  const goBack = () => {
    if (showPaymentForm) {
      setShowPaymentForm(false);
    } else {
      navigate('/');
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-black">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 25 }}
          className="w-full max-w-md p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 15 }}
              className="flex justify-center mb-6"
            >
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-4 text-white">
              Thank You!
            </h3>
            
            <p className="text-lg mb-6 text-white/70">
              Your donation of <span className="font-semibold text-white">${amount.toFixed(2)}</span> has been processed successfully.
            </p>
            
            <p className="text-sm mb-6 text-white/50">
              Redirecting to homepage...
            </p>

            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/20 transition-all border border-white/20"
            >
              Go Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={goBack}
            className="flex items-center mb-4 px-4 py-2 rounded-lg transition-colors hover:bg-white/10 text-white/70 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-white/10 rounded-full mr-4 backdrop-blur-sm">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">
                Support My Work
              </h1>
            </div>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Your support helps me continue creating amazing projects and sharing knowledge with the community. 
              Every contribution, no matter the size, makes a difference!
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - Amount selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            {!showPaymentForm ? (
              <>
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Choose Your Donation Amount
                </h2>
                
                {/* Predefined amounts */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {predefinedAmounts.map((predefinedAmount) => (
                    <motion.button
                      key={predefinedAmount}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAmountSelect(predefinedAmount)}
                      className={`p-4 rounded-lg font-semibold transition-all ${
                        amount === predefinedAmount
                          ? 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
                          : 'bg-white/5 backdrop-blur-sm text-white/70 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      ${predefinedAmount}
                    </motion.button>
                  ))}
                </div>

                {/* Custom amount input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-white/70">
                    Or enter a custom amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                      $
                    </span>
                    <input
                      type="number"
                      min="5"
                      step="0.01"
                      value={amount}
                      onChange={handleCustomAmountChange}
                      placeholder="Enter custom amount"
                      className="w-full pl-8 pr-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20"
                    />
                  </div>
                  
                  {amount < 5 && amount > 0 && (
                    <p className="text-sm text-red-400 mt-2">
                      Minimum donation amount is $5.00
                    </p>
                  )}
                </div>

                {/* Proceed button */}
                <motion.button
                  onClick={proceedToPayment}
                  disabled={amount < 5}
                  whileHover={{ scale: amount >= 5 ? 1.02 : 1 }}
                  whileTap={{ scale: amount >= 5 ? 0.98 : 1 }}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    amount >= 5
                      ? 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20'
                      : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5'
                  }`}
                >
                  Continue to Payment
                </motion.button>
              </>
            ) : (
              <Elements stripe={stripePromise}>
                <PaymentForm
                  amount={amount}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  isDarkMode={true}
                />
              </Elements>
            )}
          </motion.div>

          {/* Right side - Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <h3 className="text-xl font-bold mb-6 text-white">
              Why Support Me?
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-2 bg-white/10 rounded-lg mr-3 mt-1 backdrop-blur-sm">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-white">
                    Open Source Projects
                  </h4>
                  <p className="text-sm text-white/70">
                    I create and maintain open source projects that benefit the developer community.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 bg-white/10 rounded-lg mr-3 mt-1 backdrop-blur-sm">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-white">
                    Educational Content
                  </h4>
                  <p className="text-sm text-white/70">
                    I share knowledge through tutorials, articles, and code examples.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 bg-white/10 rounded-lg mr-3 mt-1 backdrop-blur-sm">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-white">
                    Continuous Improvement
                  </h4>
                  <p className="text-sm text-white/70">
                    Your support helps me invest in better tools and resources for development.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <h4 className="font-semibold mb-2 text-white">
                Secure Payment
              </h4>
              <p className="text-sm text-white/70">
                All payments are processed securely through Stripe. Your payment information is encrypted and never stored on our servers.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
