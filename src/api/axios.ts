import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'https://proyectofinal-a6au.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            Cookies.remove('token');
            localStorage.removeItem('user');
        }
        return Promise.reject(error);
    }
);

export default api;
