import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export const Header = () => {
    const { user, logout } = useAuth();
    const { itemCount, toggleCart } = useCart();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?q=${encodeURIComponent(searchTerm)}`);
        } else {
            navigate('/');
        }
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <span className="text-3xl font-bold text-primary">coolbox</span>
                    </Link>

                    {/* Categories Button */}
                    <div className="relative group">
                        <button className="hidden md:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors">
                            <Menu size={20} />
                            Categorías
                        </button>

                        {/* Dropdown Menu */}
                        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg py-2 hidden group-hover:block border border-gray-100 animate-fade-in z-50">
                            <div className="px-4 py-2 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Marcas
                            </div>
                            <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                                Ver Todo
                            </Link>
                            <Link to="/?category=APPLE" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                                Apple
                            </Link>
                            <Link to="/?category=SAMSUNG" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                                Samsung
                            </Link>
                            <Link to="/?category=LENOVO" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                                Lenovo
                            </Link>
                            <Link to="/?category=ASUS" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                                Asus
                            </Link>
                            <Link to="/?category=STARLINK" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                                Starlink
                            </Link>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative hidden sm:block">
                        <input
                            type="text"
                            placeholder="¿Qué estás buscando?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                            <Search size={20} />
                        </button>
                    </form>

                    {/* User Actions */}
                    <div className="flex items-center gap-6 text-gray-600">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <User size={24} />
                                    <div className="hidden lg:block text-sm leading-tight">
                                        <div>Hola,</div>
                                        <div className="font-bold">{user.nombreCompleto}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={logout}
                                    className="text-gray-400 hover:text-primary"
                                    title="Cerrar sesión"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center gap-2 hover:text-primary">
                                <User size={24} />
                                <div className="hidden lg:block text-sm leading-tight">
                                    <div>Iniciar</div>
                                    <div className="font-bold">sesión</div>
                                </div>
                            </Link>
                        )}

                        <Link to="/purchases" className="flex items-center gap-2 hover:text-primary">
                            <div className="hidden lg:block text-right text-sm leading-tight">
                                <div>Mis</div>
                                <div className="font-bold">compras</div>
                            </div>
                        </Link>

                        <button onClick={toggleCart} className="relative hover:text-primary">
                            <ShoppingCart size={24} />
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Search (visible only on small screens) */}
                <form onSubmit={handleSearch} className="mt-3 sm:hidden relative">
                    <input
                        type="text"
                        placeholder="¿Qué estás buscando?"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                        <Search size={20} />
                    </button>
                </form>
            </div>
        </header>
    );
};
