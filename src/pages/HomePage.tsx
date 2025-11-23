
import { ProductCard } from '../components/ProductCard';
import { ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../data';

export const HomePage = () => {
    return (
        <div className="bg-secondary min-h-screen pb-12">
            <div className="container mx-auto px-4 py-6">
                {/* Banner / Title Section */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">¡Lo mejor de Coolbox!</h1>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-full bg-white shadow hover:bg-gray-50">
                            <ChevronRight className="rotate-180" size={20} />
                        </button>
                        <button className="p-2 rounded-full bg-white shadow hover:bg-gray-50">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {PRODUCTS.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </div>
    );
};
