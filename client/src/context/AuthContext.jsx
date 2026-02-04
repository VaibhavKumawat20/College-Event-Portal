import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in via cookie/localStorage
        // For cookies, we might need a separate endpoint /api/auth/me if we want to persist session on refresh
        // For now, let's assume we store user info in localStorage for simple persistence UI, but rely on cookie for requests options
        // Ideally: fetch /api/auth/profile on mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password, role) => {
        const res = await api.post('/auth/login', { email, password, role });
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
    };

    const register = async (userData) => {
        const res = await api.post('/auth/register', userData);
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (e) {
            console.error(e);
        }
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
