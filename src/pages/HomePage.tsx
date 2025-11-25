import { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { ChevronRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import { type Product } from '../data';

export const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q')?.toLowerCase() || '';
    const categoryQuery = searchParams.get('category')?.toUpperCase() || '';
    const sucursalId = 3;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/productos/sucursal/${sucursalId}`);
                console.log(response.data);
                setProducts(response.data);
            } catch (err) {
                console.error("Failed to fetch products", err);
                setError("No se pudieron cargar los productos.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.nombreProducto.toLowerCase().includes(searchQuery) ||
            product.marcaProducto.toLowerCase().includes(searchQuery);
        const matchesCategory = categoryQuery ? product.marcaProducto === categoryQuery : true; // Assuming category filter uses brand for now as per previous logic

        return matchesSearch && matchesCategory;
    });

    const getTitle = () => {
        if (searchQuery) return `Resultados para "${searchQuery}"`;
        if (categoryQuery) return `Productos ${categoryQuery}`;
        return '¡Lo mejor de Coolbox!';
    };

    if (loading) {
        return (
            <div className="bg-secondary min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">Cargando productos...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-secondary min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="bg-secondary min-h-screen pb-12 animate-fade-in">
            <div className="container mx-auto px-4 py-6">
                {/* Banner / Title Section */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {getTitle()}
                    </h1>
                    {!searchQuery && !categoryQuery && (
                        <div className="flex gap-2">
                            <button className="p-2 rounded-full bg-white shadow hover:bg-gray-50 transition-colors">
                                <ChevronRight className="rotate-180" size={20} />
                            </button>
                            <button className="p-2 rounded-full bg-white shadow hover:bg-gray-50 transition-colors">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.idProducto} {...product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
