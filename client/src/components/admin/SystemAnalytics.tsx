import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SystemAnalytics = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await axios.get('/api/analytics');
                setAnalyticsData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalyticsData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>System Analytics</h1>
            <div>
                <h2>User Statistics</h2>
                <p>Total Users: {analyticsData.totalUsers}</p>
                <p>Active Users: {analyticsData.activeUsers}</p>
            </div>
            <div>
                <h2>Subscription Statistics</h2>
                <p>Total Subscriptions: {analyticsData.totalSubscriptions}</p>
                <p>Active Subscriptions: {analyticsData.activeSubscriptions}</p>
            </div>
            <div>
                <h2>Payment Statistics</h2>
                <p>Total Revenue: ${analyticsData.totalRevenue}</p>
                <p>Successful Payments: {analyticsData.successfulPayments}</p>
            </div>
        </div>
    );
};

export default SystemAnalytics;