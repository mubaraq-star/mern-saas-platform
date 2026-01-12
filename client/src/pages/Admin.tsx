import React from 'react';
import AdminPanel from '../components/admin/AdminPanel';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Admin = () => {
    return (
        <div className="admin-page">
            <Header />
            <div className="admin-content">
                <Sidebar />
                <AdminPanel />
            </div>
            <Footer />
        </div>
    );
};

export default Admin;