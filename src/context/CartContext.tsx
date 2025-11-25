import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    brand: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    total: number;
    itemCount: number;
    isCartOpen: boolean;
    toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: any) => {
        // Map API product structure to CartItem
        // We handle both old structure (if any legacy code remains) and new structure
        const id = product.idProducto ? product.idProducto.toString() : product.id;
        const name = product.nombreProducto || product.name;

        // Get price from inventory for sucursal 3, fallback to base price
        const sucursalId = 3;
        const inventoryItem = product.inventario?.find((item: any) => item.idSucursal === sucursalId);
        const price = inventoryItem?.precioProducto ?? product.precio ?? product.price ?? 0;

        const image = product.urlImagenProducto || product.image;
        const brand = product.marcaProducto || product.brand;

        setItems(prev => {
            const existing = prev.find(item => item.id === id);
            if (existing) {
                return prev.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, {
                id,
                name,
                price,
                image,
                brand,
                quantity: 1
            }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const toggleCart = () => setIsCartOpen(prev => !prev);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            total,
            itemCount,
            isCartOpen,
            toggleCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
