import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import Cookies from 'js-cookie';

interface User {
    nombreCompleto: string;
    email: string;
    idCliente?: string;
    telefono: string;
    activo: boolean;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (
        nombreCompleto: string,
        email: string,
        password: string,
        telefono: string,
        direccion: string,
        tipoDocumento: string,
        numeroDocumento: string
    ) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const validateToken = async () => {
            const storedUser = localStorage.getItem('user');
            const token = Cookies.get('token');

            if (storedUser && token) {
                try {
                    // Validate token by making a lightweight API call
                    // Using the products endpoint as a validation check
                    await api.get('/productos/sucursal/3');
                    // If successful, token is valid
                    setUser(JSON.parse(storedUser));
                } catch (err) {
                    // Token is invalid or expired, clear everything
                    console.log('Token validation failed, logging out');
                    localStorage.removeItem('user');
                    Cookies.remove('token');
                    setUser(null);
                }
            }
        };

        validateToken();
    }, []);

    // Listen for unauthorized events from axios interceptor
    useEffect(() => {
        const handleUnauthorized = () => {
            setUser(null);
        };

        window.addEventListener('unauthorized', handleUnauthorized);
        return () => window.removeEventListener('unauthorized', handleUnauthorized);
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        const payload = {
            email: email,
            password: password
        };
        try {
            const response = await api.post('/clientes/login', payload);
            console.log(response.data);
            const { usuario, token } = response.data;

            Cookies.set('token', token, { expires: 7 });
            localStorage.setItem('user', JSON.stringify(usuario));
            setUser(usuario);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (
        nombreCompleto: string,
        email: string,
        password: string,
        telefono: string,
        direccion: string,
        tipoDocumento: string,
        numeroDocumento: string
    ) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/clientes/register', {
                nombreCompleto,
                email,
                password,
                telefono,
                direccion,
                tipoDocumento,
                numeroDocumento,
                idCiudad: 1
            });
            const { usuario, token } = response.data;

            Cookies.set('token', token, { expires: 7 });
            localStorage.setItem('user', JSON.stringify(usuario));
            setUser(usuario);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        Cookies.remove('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
