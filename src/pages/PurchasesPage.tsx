
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data';

export const PurchasesPage = () => {
    // Mock purchases derived from PRODUCTS
    const purchases = [
        {
            id: 'ord_123',
            date: '20/11/2025',
            status: 'Entregado',
            total: 1999,
            items: [PRODUCTS[0]]
        },
        {
            id: 'ord_124',
            date: '15/10/2025',
            status: 'Entregado',
            total: 279,
            items: [PRODUCTS[1]]
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Mis Compras</h1>

            <div className="space-y-4">
                {purchases.map((purchase) => (
                    <div key={purchase.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                            <div className="flex gap-8 text-sm">
                                <div>
                                    <span className="block text-gray-500">Fecha de pedido</span>
                                    <span className="font-medium text-gray-900">{purchase.date}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500">Total</span>
                                    <span className="font-medium text-gray-900">S/ {purchase.total.toLocaleString('es-PE')}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500">Pedido #</span>
                                    <span className="font-medium text-gray-900">{purchase.id}</span>
                                </div>
                            </div>
                            <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                {purchase.status}
                            </div>
                        </div>

                        <div className="p-6">
                            {purchase.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 object-contain bg-gray-50 rounded-md"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">
                                            <Link to={`/product/${item.id}`} className="hover:text-primary">
                                                {item.name}
                                            </Link>
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                                    </div>
                                    <div className="text-right">
                                        <Link
                                            to={`/product/${item.id}`}
                                            className="inline-block px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Ver producto
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
