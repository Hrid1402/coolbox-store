import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

export const PurchasesPage = () => {
    const { orders } = useOrders();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Compras</h1>

            {orders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <Package size={64} className="mx-auto text-gray-300 mb-4" />
                    <h2 className="text-xl font-medium text-gray-900 mb-2">No tienes compras registradas</h2>
                    <p className="text-gray-500 mb-6">¡Aprovecha nuestras ofertas y empieza a comprar!</p>
                    <Link to="/" className="inline-block bg-primary text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 transition-colors">
                        Ir a comprar
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap gap-4 justify-between items-center">
                                <div className="flex gap-8">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold">Fecha de pedido</p>
                                        <p className="text-sm font-medium text-gray-900">{order.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold">Total</p>
                                        <p className="text-sm font-medium text-gray-900">S/ {order.total.toLocaleString('es-PE')}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold">Pedido #</p>
                                        <p className="text-sm font-medium text-gray-900">{order.id}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Entregado' ? 'bg-green-100 text-green-800' :
                                            order.status === 'En camino' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-6">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-start gap-4">
                                            <div className="w-20 h-20 flex-shrink-0 border border-gray-200 rounded-md overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain object-center"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-base font-medium text-gray-900">
                                                    <Link to={`/product/${item.id}`} className="hover:text-primary">
                                                        {item.name}
                                                    </Link>
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                                                <p className="mt-1 text-sm text-gray-500">Cantidad: {item.quantity}</p>
                                            </div>
                                            <div className="flex-shrink-0 self-center">
                                                <Link
                                                    to={`/product/${item.id}`}
                                                    className="text-primary hover:text-red-700 font-medium text-sm flex items-center gap-1"
                                                >
                                                    Ver producto <ChevronRight size={16} />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
