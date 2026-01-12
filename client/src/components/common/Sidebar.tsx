import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <h2>Navigation</h2>
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/subscription">Subscription</Link>
                </li>
                <li>
                    <Link to="/admin">Admin Panel</Link>
                </li>
                <li>
                    <Link to="/analytics">Analytics</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;