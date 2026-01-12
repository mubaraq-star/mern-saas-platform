import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Home: React.FC = () => {
    return (
        <div>
            <Header />
            <main>
                <h1>Welcome to Our SaaS Platform</h1>
                <p>Your one-stop solution for managing subscriptions and analytics.</p>
                <Link to="/register">Get Started</Link>
            </main>
            <Footer />
        </div>
    );
};

export default Home;