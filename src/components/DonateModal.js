import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_51R0IXABGna2WXkSDIS8xxw8XN6OCAJPz2f97f5cvZiBRYxHYWbiROyXJUjbsYwbg3ftCmnoKIcnhRtzvwnvGhWtc00JcGN8Uoy');

// Backend URL - will be different in production vs. development
const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? 'https://backend-server-iota-eight.vercel.app' // Replace with your deployed backend URL
  : 'http://localhost:4000';

const DonateModal = ({ onClose }) => {
  // Redirect to Stripe checkout immediately when component mounts
  useEffect(() => {
    // Default donation amount
    const defaultAmount = 10;
    
    const redirectToStripe = async () => {
      try {
        // Create a checkout session via our backend
        const response = await fetch(`${BACKEND_URL}/create-checkout-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: defaultAmount }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || 'Failed to create checkout session');
        }
        
        const { id } = await response.json();
        
        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId: id });
        
        if (error) {
          throw new Error(error.message);
        }
      } catch (err) {
        console.error('Stripe checkout error:', err);
        // Close modal if there's an error
        onClose();
        // You might want to add some notification to the user here
      }
    };

    redirectToStripe();
    
    // Cleanup function to reset body overflow
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // Return null as we're redirecting directly to Stripe
  // No UI needed for this component anymore
  return null;
};

export default DonateModal; 