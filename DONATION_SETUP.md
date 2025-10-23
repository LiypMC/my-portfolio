# Donation System Setup Guide

This guide will help you set up and run the custom donation system for your portfolio website.

## Features

- ✅ Custom donation form that stays on your website (no redirect to Stripe)
- ✅ Minimum donation amount of $5
- ✅ Predefined amounts ($5, $10, $25, $50, $100) and custom amount input
- ✅ Secure payment processing with Stripe Elements
- ✅ Beautiful UI with dark/light mode support
- ✅ Mobile responsive design
- ✅ Success/error handling
- ✅ Both modal and dedicated page options

## Setup Instructions

### 1. Install Dependencies

First, install the new dependencies for the backend server:

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in your project root with your Stripe keys:

```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_51S9P6SRWKWoGAyR5CagxSe1F2QDv3bsmJwUtZsac3buIjaIZLUxx5hJCHmuwKWNV3kO4gtf90EkupTYA8XQxOMLK005nIjaX
REACT_APP_STRIPE_SECRET_KEY=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
REACT_APP_STRIPE_PRICE_ID=price_1SKlNPRWKWoGAyR5lM8PGhZX
REACT_APP_STRIPE_PRODUCT_ID=prod_THK1IFAwElFB87
REACT_APP_STRIPE_CURRENCY=usd
REACT_APP_STRIPE_PRODUCT_NAME=Donation
```

### 3. Running the Application

#### Development Mode (Both Frontend and Backend)

To run both the React frontend and Express backend simultaneously:

```bash
npm run dev
```

This will start:
- React frontend on `http://localhost:3000`
- Express backend on `http://localhost:4000`

#### Running Separately

If you prefer to run them separately:

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm start
```

### 4. Testing the Donation System

1. **Navigate to the donation page**: Visit `http://localhost:3000/donate`
2. **Or use the donate button**: Click the "Donate" button in the navbar
3. **Select an amount**: Choose from predefined amounts or enter a custom amount (minimum $5)
4. **Enter payment details**: Use Stripe's test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **Requires authentication**: `4000 0025 0000 3155`
5. **Complete the payment**: The form will process the payment and show a success message

### 5. Production Deployment

#### Frontend Deployment

1. Build the React app:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting service (Vercel, Netlify, etc.)

#### Backend Deployment

1. Deploy `server.js` to a Node.js hosting service (Heroku, Railway, Render, etc.)
2. Update the `BACKEND_URL` in your components to point to your production backend URL
3. Set environment variables on your hosting platform:
   - `STRIPE_SECRET_KEY`
   - `PORT` (if needed)

### 6. File Structure

```
my-portfolio/
├── server.js                 # Express backend server
├── src/
│   ├── components/
│   │   ├── DonateModal.js    # Modal donation component
│   │   └── DonatePage.js     # Dedicated donation page
│   └── App.js                # Updated with donation route
└── package.json              # Updated with new dependencies
```

### 7. API Endpoints

The backend provides these endpoints:

- `POST /create-payment-intent` - Creates a Stripe payment intent
- `POST /confirm-payment` - Confirms payment status
- `GET /health` - Health check endpoint

### 8. Security Notes

- ✅ Stripe secret key is only used on the backend
- ✅ Frontend only uses the publishable key
- ✅ Payment information is never stored on your servers
- ✅ All communication is encrypted via HTTPS
- ✅ Minimum donation amount validation

### 9. Customization

You can customize:
- **Minimum donation amount**: Change the validation in `server.js` and components
- **Predefined amounts**: Modify the `predefinedAmounts` array in components
- **Styling**: Update Tailwind classes for colors, spacing, etc.
- **Success message**: Customize the success page content
- **Currency**: Change from USD to other supported currencies

### 10. Troubleshooting

**Common issues:**

1. **CORS errors**: Make sure the backend URL is correct in your components
2. **Payment fails**: Check that your Stripe keys are correct and active
3. **Server not starting**: Ensure all dependencies are installed with `npm install`
4. **Environment variables not loading**: Make sure `.env.local` is in the project root

**Test with Stripe test cards:**
- `4242 4242 4242 4242` - Visa (success)
- `4000 0000 0000 0002` - Declined
- `4000 0025 0000 3155` - Requires authentication

### 11. Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the backend server logs
3. Verify your Stripe dashboard for payment attempts
4. Ensure all environment variables are set correctly

The donation system is now ready to use! Users can donate through either the modal popup or the dedicated `/donate` page, and all payments will be processed securely through Stripe while keeping users on your website.
