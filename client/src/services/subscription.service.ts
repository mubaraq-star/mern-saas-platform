import api from './api';

const SubscriptionService = {
    getPricingPlans: async () => {
        try {
            const response = await api.get('/subscription/plans');
            return response.data;
        } catch (error) {
            throw new Error('Error fetching pricing plans');
        }
    },

    getSubscriptionStatus: async (userId) => {
        try {
            const response = await api.get(`/subscription/status/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching subscription status');
        }
    },

    createSubscription: async (subscriptionData) => {
        try {
            const response = await api.post('/subscription/create', subscriptionData);
            return response.data;
        } catch (error) {
            throw new Error('Error creating subscription');
        }
    },

    cancelSubscription: async (subscriptionId) => {
        try {
            const response = await api.delete(`/subscription/cancel/${subscriptionId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error canceling subscription');
        }
    }
};

export default SubscriptionService;