
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data';
import { ShoppingCart, ChevronLeft } from 'lucide-react';

export const ProductDetailPage = () => {
    const { id } = useParams();
    const product = PRODUCTS.find(p => p.id === id);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
                <Link to="/" className="text-primary hover:underline">Volver al inicio</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-6">
                <ChevronLeft size={20} />
                Volver
            </Link>

            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Section */}
                    <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="max-w-full max-h-[400px] object-contain"
                        />
                    </div>

                    {/* Info Section */}
                    <div>
                        <div className="text-sm text-gray-500 font-bold uppercase mb-2">{product.brand}</div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            {product.name}
                        </h1>

                        <div className="border-t border-b border-gray-100 py-4 mb-6">
                            {product.originalPrice && (
                                <div className="text-gray-400 line-through mb-1">
                                    S/ {product.originalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-bold text-primary">
                                    S/ {product.price.toLocaleString('es-PE', { minimumFractionDigits: 0 })}
                                </span>
                                {product.discount && (
                                    <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                                        {product.discount}% DSCTO
                                    </span>
                                )}
                            </div>
                            {product.installments && (
                                <div className="text-sm text-green-600 font-medium mt-2">
                                    ¡Llévatelo en {product.installments.count} cuotas de S/ {product.installments.amount.toFixed(2)}!
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>

                            {product.specs && (
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">Características principales:</h3>
                                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                                        {product.specs.map((spec, index) => (
                                            <li key={index}>{spec}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <button className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                                <ShoppingCart size={24} />
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
