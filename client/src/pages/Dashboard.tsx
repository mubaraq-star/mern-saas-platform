import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';
import Analytics from '../components/dashboard/Analytics';
import SubscriptionStatus from '../components/subscription/SubscriptionStatus';

const Dashboard: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div className="dashboard">
            <Header />
            <div className="dashboard-content">
                <Sidebar />
                <main>
                    <h1>Welcome, {user?.name}</h1>
                    <SubscriptionStatus />
                    <Analytics />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;