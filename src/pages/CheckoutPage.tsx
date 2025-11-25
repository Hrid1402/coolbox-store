import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Landmark } from 'lucide-react';

export const CheckoutPage = () => {
    const { items, total, clearCart } = useCart();
    const { addOrder } = useOrders();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
    const [address, setAddress] = useState('');
    const [observations, setObservations] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login', { state: { from: '/checkout' } });
        }
    }, [user, navigate]);

    if (!user) return null;

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
                <button
                    onClick={() => navigate('/')}
                    className="text-primary hover:underline"
                >
                    Volver a la tienda
                </button>
            </div>
        );
    }

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            await addOrder(items, total, paymentMethod, address, observations);
            clearCart();
            navigate('/purchases');
        } catch (error) {
            console.error("Payment failed", error);
            // Ideally show an error message to the user
            alert("Hubo un error al procesar el pedido. Por favor intente nuevamente.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizar Compra</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Payment Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <form onSubmit={handlePayment}>
                            {/* Shipping Details */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Datos de Envío</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Dirección de Entrega</label>
                                        <input
                                            id="address"
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Av. Principal 123, Dpto 401, Lima"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="observations" className="block text-sm font-medium text-gray-700 mb-1">Observaciones (Opcional)</label>
                                        <textarea
                                            id="observations"
                                            value={observations}
                                            onChange={(e) => setObservations(e.target.value)}
                                            placeholder="Referencia, horario de entrega, etc."
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-xl font-bold mb-6">Método de Pago</h2>

                            <div className="flex gap-4 mb-8">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('card')}
                                    className={`flex-1 p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${paymentMethod === 'card'
                                        ? 'border-primary bg-red-50 text-primary'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <CreditCard size={24} />
                                    <span className="font-medium">Tarjeta de Crédito/Débito</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('bank')}
                                    className={`flex-1 p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${paymentMethod === 'bank'
                                        ? 'border-primary bg-red-50 text-primary'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <Landmark size={24} />
                                    <span className="font-medium">Transferencia Bancaria</span>
                                </button>
                            </div>

                            {paymentMethod === 'card' ? (
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Número de Tarjeta</label>
                                        <input
                                            id="cardNumber"
                                            name="cardNumber"
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                            required
                                            maxLength={19}
                                            autoComplete="cc-number"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Expiración</label>
                                            <input
                                                id="expiry"
                                                name="expiry"
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                required
                                                maxLength={5}
                                                autoComplete="cc-exp"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                            <input
                                                id="cvv"
                                                name="cvv"
                                                type="text"
                                                placeholder="123"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                required
                                                maxLength={4}
                                                autoComplete="cc-csc"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Titular</label>
                                        <input
                                            id="cardName"
                                            name="cardName"
                                            type="text"
                                            placeholder="Como aparece en la tarjeta"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                            required
                                            autoComplete="cc-name"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                                    <h3 className="font-bold text-gray-900 mb-2">Datos para transferencia:</h3>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <p><span className="font-medium">Banco:</span> BCP</p>
                                        <p><span className="font-medium">Cuenta Corriente Soles:</span> 193-1234567-0-00</p>
                                        <p><span className="font-medium">CCI:</span> 002-193-001234567000-12</p>
                                        <p><span className="font-medium">Titular:</span> Coolbox Store S.A.C.</p>
                                        <p className="mt-4 text-xs text-gray-500">
                                            * Por favor envía el comprobante de pago a pagos@coolbox.pe indicando tu número de pedido.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="mt-8 w-full bg-primary text-white py-4 rounded-md font-bold text-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isProcessing ? 'Procesando...' : `Pagar S/ ${total.toLocaleString('es-PE')}`}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                        <h2 className="text-lg font-bold mb-4">Resumen del Pedido</h2>
                        <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 text-sm">
                                    <div className="w-16 h-16 border rounded overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium line-clamp-2">{item.name}</p>
                                        <p className="text-gray-500">Cant: {item.quantity}</p>
                                        <p className="font-bold text-primary">S/ {(item.price * item.quantity).toLocaleString('es-PE')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>S/ {total.toLocaleString('es-PE')}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Envío</span>
                                <span className="text-green-600 font-medium">Gratis</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                                <span>Total</span>
                                <span>S/ {total.toLocaleString('es-PE')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
