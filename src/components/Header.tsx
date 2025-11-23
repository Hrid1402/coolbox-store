
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';

export const Header = () => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <span className="text-3xl font-bold text-primary">coolbox</span>
                    </Link>

                    {/* Categories Button */}
                    <button className="hidden md:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors">
                        <Menu size={20} />
                        Categorías
                    </button>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl relative hidden sm:block">
                        <input
                            type="text"
                            placeholder="¿Qué estás buscando?"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center gap-6 text-gray-600">
                        <Link to="/login" className="flex items-center gap-2 hover:text-primary">
                            <User size={24} />
                            <div className="hidden lg:block text-sm leading-tight">
                                <div>Iniciar</div>
                                <div className="font-bold">sesión</div>
                            </div>
                        </Link>

                        <Link to="/purchases" className="flex items-center gap-2 hover:text-primary">
                            <div className="hidden lg:block text-right text-sm leading-tight">
                                <div>Mis</div>
                                <div className="font-bold">compras</div>
                            </div>
                        </Link>

                        <Link to="/cart" className="relative hover:text-primary">
                            <ShoppingCart size={24} />
                            {/* Badge placeholder */}
                            {/* <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">0</span> */}
                        </Link>
                    </div>
                </div>

                {/* Mobile Search (visible only on small screens) */}
                <div className="mt-3 sm:hidden relative">
                    <input
                        type="text"
                        placeholder="¿Qué estás buscando?"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
            </div>
        </header>
    );
};
