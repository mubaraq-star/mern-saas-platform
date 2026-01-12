export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const JWT_TOKEN_KEY = 'jwt_token';

export const SUBSCRIPTION_PLANS = [
    {
        id: 'basic',
        name: 'Basic Plan',
        price: 10,
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
        id: 'pro',
        name: 'Pro Plan',
        price: 20,
        features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    },
    {
        id: 'enterprise',
        name: 'Enterprise Plan',
        price: 50,
        features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
    },
];

export const ANALYTICS_CHART_OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            beginAtZero: true,
        },
        y: {
            beginAtZero: true,
        },
    },
};