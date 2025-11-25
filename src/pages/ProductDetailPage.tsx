import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Loader } from '../components/Loader';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import { type Product } from '../data';

export const ProductDetailPage = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const sucursalId = 3;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/productos/${id}`);
                console.log(response.data);
                setProduct(response.data);
            } catch (err) {
                console.error("Failed to fetch product", err);
                setError("No se pudo cargar el producto.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">{error || "Producto no encontrado"}</h2>
                <Link to="/" className="text-primary hover:underline">Volver al inicio</Link>
            </div>
        );
    }


    const inventoryItem = product.inventario?.find(item => item.idSucursal === sucursalId);

    const basePrice = inventoryItem?.precioProducto ?? product.precio ?? 0;

    const originalPrice = basePrice;
    const hasDiscount = product.porcentajeDescuento !== null && product.porcentajeDescuento > 0;
    const finalPrice = hasDiscount
        ? basePrice - (basePrice * ((product.porcentajeDescuento || 0) / 100))
        : basePrice;

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-6">
                <ChevronLeft size={20} />
                Volver
            </Link>

            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8 w-full h-96 md:h-[500px]">
                        <img
                            src={product.urlImagenProducto}
                            alt={product.nombreProducto}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%23f3f4f6" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%239ca3af"%3ESin imagen%3C/text%3E%3C/svg%3E';
                            }}
                        />
                    </div>

                    {/* Info Section */}
                    <div>
                        <div className="text-sm text-gray-500 font-bold uppercase mb-2">{product.marcaProducto}</div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            {product.nombreProducto}
                        </h1>

                        <div className="border-t border-b border-gray-100 py-4 mb-6">
                            {hasDiscount && (
                                <div className="text-gray-400 line-through mb-1">
                                    S/ {originalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-bold text-primary">
                                    S/ {finalPrice.toLocaleString('es-PE', { minimumFractionDigits: 0 })}
                                </span>
                                {hasDiscount && (
                                    <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                                        -{product.porcentajeDescuento}% DSCTO
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <p className="text-gray-600 leading-relaxed">
                                {product.especificacionesProducto}
                            </p>

                            <button
                                onClick={() => addToCart(product)}
                                className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                            >
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
