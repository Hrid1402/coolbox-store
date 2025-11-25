import React from 'react';
import { Link } from 'react-router-dom';
import { type Product } from '../data';

export const ProductCard: React.FC<Product> = ({
    idProducto,
    marcaProducto,
    nombreProducto,
    urlImagenProducto,
    precio,
    porcentajeDescuento,
}) => {
    // Default to 0 if price is missing (though it should be handled)
    const basePrice = precio || 0;
    const originalPrice = basePrice;
    const hasDiscount = porcentajeDescuento !== null && porcentajeDescuento > 0;
    const finalPrice = hasDiscount
        ? basePrice - (basePrice * ((porcentajeDescuento || 0) / 100))
        : basePrice;

    return (
        <Link to={`/product/${idProducto}`} className="group bg-white rounded-lg p-4 hover:shadow-lg transition-shadow border border-transparent hover:border-gray-200 h-full flex flex-col">
            {/* Image */}
            <div className="relative aspect-square mb-4 overflow-hidden">
                <img
                    src={urlImagenProducto}
                    alt={nombreProducto}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
                <div className="text-xs text-gray-500 font-bold uppercase mb-1">{marcaProducto}</div>
                <h3 className="text-sm text-gray-800 font-medium leading-snug mb-4 line-clamp-2 flex-grow">
                    {nombreProducto}
                </h3>

                <div className="mt-auto">
                    {/* Price Section */}
                    {hasDiscount && (
                        <div className="text-xs text-gray-400 line-through mb-1">
                            S/ {originalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                        </div>
                    )}

                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl font-bold text-gray-900">
                            S/ {finalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                        </span>
                        {hasDiscount && (
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                                -{porcentajeDescuento}%
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};
