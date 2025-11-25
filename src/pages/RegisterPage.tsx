import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RegisterPage = () => {
    const { register, loading, error: authError } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [localError, setLocalError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        if (formData.password !== formData.confirmPassword) {
            setLocalError('Las contraseñas no coinciden');
            return;
        }

        if (formData.password.length < 6) {
            setLocalError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            await register(formData.name, formData.email, formData.password);
            navigate('/');
        } catch (err) {
            console.error("Registration failed", err);
        }
    };

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Crear cuenta
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to="/login" className="font-medium text-primary hover:text-red-700">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {(localError || authError) && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{localError || authError}</span>
                        </div>
                    )}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Nombre completo
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Nombre completo"
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Correo electrónico
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Correo electrónico"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Contraseña"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="sr-only">
                                Confirmar Contraseña
                            </label>
                            <input
                                id="confirm-password"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Confirmar Contraseña"
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                            Acepto los términos y condiciones
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Cargando...' : 'Registrarse'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
