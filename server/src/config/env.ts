import dotenv from 'dotenv';

dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-saas',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'your_stripe_secret_key',
  PAYMENT_API_URL: process.env.PAYMENT_API_URL || 'https://api.paymentgateway.com',
  ANALYTICS_API_URL: process.env.ANALYTICS_API_URL || 'https://api.analytics.com',
};

export default env;