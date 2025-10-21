# Donations API Configuration Guide

To ensure the donation flow works with Stripe Checkout, update your API configuration as follows.

## 1. Use a price identifier instead of a product ID

Stripe Checkout sessions require a `price_...` identifier in the `line_items`. Replace any `prod_...` value with your valid recurring or one-time price ID. For the values you shared, update your `.env` like this:

```
STRIPE_PRICE_ID=price_1SKlNPRWKWoGAyR5lM8PGhZX
```

If you need to confirm the ID, open the Price in the Stripe Dashboard and copy the value from the "API ID" field. A product ID (`prod_...`) will not work here.

## 2. Pass the amount as metadata (optional)

Keep the existing metadata assignment so you can reconcile donations later:

```js
metadata: {
  donationAmount: amount
}
```

## 3. Verify redirect URLs

Make sure your environment still points to working pages:

```
SUCCESS_URL=https://naol.pro/success
CANCEL_URL=https://naol.pro/cancel
```

If those pages live on HTTPS, update both values to use `https://`.

## 4. Confirm allowed origins

Your Express `cors` configuration already allows `https://naol.pro`. If you need to test locally, add `http://localhost:3000` to `CLIENT_URL` or expand `origin` to an array:

```js
app.use(cors({
  origin: [process.env.CLIENT_URL || 'http://localhost:3000', 'http://localhost:3000']
}));
```

Only add development origins if necessary.

## 5. Restart the API after changes

Whenever you update the `.env` or API code, restart the server (or redeploy) so Stripe picks up the new configuration.

Following these steps keeps the donations API aligned with the front-end fallback checkout logic.
