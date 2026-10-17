import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { findProduct } from '../data/catalog';

const CartContext = createContext(null);
const CART_KEY = 'crestmart-cart';
const ORDERS_KEY = 'crestmart-orders';

const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const write = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage blocked */ }
};

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => read(CART_KEY, []));
    const [orders, setOrders] = useState(() => read(ORDERS_KEY, []));

    useEffect(() => write(CART_KEY, items), [items]);
    useEffect(() => write(ORDERS_KEY, orders), [orders]);

    const add = (id, qty = 1) => setItems(list => {
        const found = list.find(i => i.id === id);
        return found ? list.map(i => (i.id === id ? { ...i, qty: i.qty + qty } : i)) : [...list, { id, qty }];
    });
    const setQty = (id, qty) => setItems(list => (qty <= 0 ? list.filter(i => i.id !== id) : list.map(i => (i.id === id ? { ...i, qty } : i))));
    const remove = (id) => setItems(list => list.filter(i => i.id !== id));

    const lines = useMemo(() => items.map(i => ({ ...i, product: findProduct(i.id) })).filter(l => l.product), [items]);
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);

    const placeOrder = (details) => {
        const order = {
            id: `CM-${Date.now().toString(36).toUpperCase()}`,
            placedAt: new Date().toISOString(),
            lines: lines.map(l => ({ id: l.id, name: l.product.name, price: l.product.price, qty: l.qty })),
            subtotal,
            ...details,
        };
        setOrders(list => [order, ...list]);
        setItems([]);
        return order;
    };

    return (
        <CartContext.Provider value={{ lines, count, subtotal, add, setQty, remove, orders, placeOrder }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
