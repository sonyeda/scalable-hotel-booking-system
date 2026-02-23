import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('luxestay_user');
        if (stored) {
            try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login — replace with real API
        const mockUser = {
            id: 1,
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            email,
            token: 'mock-jwt-' + Date.now(),
            isAdmin: email.includes('admin'),
        };
        setUser(mockUser);
        localStorage.setItem('luxestay_user', JSON.stringify(mockUser));
        return mockUser;
    };

    const register = (name, email, password) => {
        const mockUser = {
            id: Date.now(),
            name,
            email,
            token: 'mock-jwt-' + Date.now(),
            isAdmin: false,
        };
        setUser(mockUser);
        localStorage.setItem('luxestay_user', JSON.stringify(mockUser));
        return mockUser;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('luxestay_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
