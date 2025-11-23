import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    id: string;
    brand: string;
    name: string;
    image: string;
    originalPrice?: number;
    price: number;
    discount?: number;
    installments?: {
        count: number;
        amount: number;
    };
}

export const ProductCard: React.FC<ProductCardProps> = ({
    id,
    brand,
    name,
    image,
    originalPrice,
    price,
    discount,
    installments,
}) => {
    return (
        <Link to={`/product/${id}`} className="group bg-white rounded-lg p-4 hover:shadow-lg transition-shadow border border-transparent hover:border-gray-200 h-full flex flex-col">
            {/* Image */}
            <div className="relative aspect-square mb-4 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
                <div className="text-xs text-gray-500 font-bold uppercase mb-1">{brand}</div>
                <h3 className="text-sm text-gray-800 font-medium leading-snug mb-4 line-clamp-2 flex-grow">
                    {name}
                </h3>

                <div className="mt-auto">
                    {/* Price Section */}
                    {originalPrice && (
                        <div className="text-xs text-gray-400 line-through mb-1">
                            S/ {originalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                        </div>
                    )}

                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl font-bold text-gray-900">
                            S/ {price.toLocaleString('es-PE', { minimumFractionDigits: 0 })}
                        </span>
                        {discount && (
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                                {discount}% DSCTO
                            </span>
                        )}
                    </div>

                    {/* Installments */}
                    {installments && (
                        <div className="text-xs text-green-600 font-medium">
                            {installments.count} cuotas de S/ {installments.amount.toFixed(2)}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};
