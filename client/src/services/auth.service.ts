import axios from 'axios';
import { store } from '../store';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const register = async (username, email, password) => {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const isAuthenticated = () => {
    const user = getCurrentUser();
    return user && user.token ? true : false;
};

export default {
    login,
    register,
    logout,
    getCurrentUser,
    isAuthenticated,
};