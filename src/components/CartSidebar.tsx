import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const CartSidebar = () => {
    const { isCartOpen, toggleCart, items, removeFromCart, updateQuantity, total } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] overflow-hidden">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={toggleCart}
            />

            {/* Sidebar */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md transform transition-transform ease-in-out duration-300 bg-white shadow-xl flex flex-col h-full">

                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-6 bg-gray-50 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                            <ShoppingBag size={20} />
                            Tu Carrito
                        </h2>
                        <button
                            onClick={toggleCart}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <ShoppingBag size={48} className="text-gray-300" />
                                <p className="text-gray-500">Tu carrito está vacío</p>
                                <button
                                    onClick={toggleCart}
                                    className="text-primary font-medium hover:underline"
                                >
                                    Continuar comprando
                                </button>
                            </div>
                        ) : (
                            <ul className="space-y-6">
                                {items.map((item) => (
                                    <li key={item.id} className="flex py-2">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-contain object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3 className="line-clamp-2 text-sm mr-2">
                                                        <Link to={`/product/${item.id}`} onClick={toggleCart}>
                                                            {item.name}
                                                        </Link>
                                                    </h3>
                                                    <p className="ml-4 whitespace-nowrap">
                                                        S/ {(item.price * item.quantity).toLocaleString('es-PE')}
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-xs text-gray-500">{item.brand}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className="flex items-center border border-gray-300 rounded">
                                                    <button
                                                        className="p-1 hover:bg-gray-100"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="px-2 font-medium">{item.quantity}</span>
                                                    <button
                                                        className="p-1 hover:bg-gray-100"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                                                >
                                                    <Trash2 size={16} />
                                                    <span className="text-xs">Eliminar</span>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-50">
                            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                                <p>Subtotal</p>
                                <p>S/ {total.toLocaleString('es-PE')}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500 mb-6">
                                Envío e impuestos calculados al finalizar la compra.
                            </p>
                            <Link
                                to="/checkout"
                                onClick={toggleCart}
                                className="w-full flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700"
                            >
                                Finalizar compra
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
