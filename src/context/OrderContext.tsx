import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem } from './CartContext';
import api from '../api/axios';
import { useAuth } from './AuthContext';

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: 'Entregado' | 'En camino' | 'Procesando';
}

interface OrderContextType {
    orders: Order[];
    addOrder: (items: CartItem[], total: number, paymentMethod: string, address: string, observations: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
        }
    }, []);

    const addOrder = async (items: CartItem[], total: number, paymentMethod: string, address: string, observations: string) => {
        if (!user) return;

        const payload = {
            idCliente: user.idCliente,
            direccionEntrega: address,
            metodoPago: paymentMethod === 'card' ? 'TARJETA' : 'TRANSFERENCIA',
            idSucursal: 3,
            idCupon: 1,
            observaciones: observations || "Ninguna",
            items: items.map(item => ({
                idProducto: parseInt(item.id),
                cantidad: item.quantity,
                precioUnitario: item.price
            }))
        };

        try {
            console.log("Sending order payload:", payload);
            const response = await api.post('/pedidos', payload);
            console.log("Order response:", response.data);

            const newOrder: Order = {
                id: response.data.idPedido?.toString() || Math.random().toString(36).substr(2, 9).toUpperCase(),
                date: new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' }),
                items,
                total,
                status: 'Procesando'
            };

            const updatedOrders = [newOrder, ...orders];
            setOrders(updatedOrders);
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
        } catch (error) {
            console.error("Failed to create order", error);
            throw error;
        }
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};
