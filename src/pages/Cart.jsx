import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { usd } from '../data/catalog';
import { ProductArt } from '../components/Product';

export const Cart = () => {
    const { lines, subtotal, setQty, remove } = useCart();

    if (lines.length === 0) {
        return (
            <div className="mx-auto max-w-xl px-4 py-24 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-slate-600" />
                <h1 className="mt-4 text-2xl font-bold text-white">Your cart is empty</h1>
                <Link to="/shop" className="mt-6 inline-block rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-500">Start shopping</Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <h1 className="text-3xl font-bold text-white">Your cart</h1>
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
                <ul className="divide-y divide-night-700 rounded-2xl border border-night-700 bg-night-900 lg:col-span-2">
                    {lines.map(({ id, qty, product }) => (
                        <li key={id} className="flex gap-4 p-4">
                            <Link to={`/product/${id}`} className="w-24 shrink-0"><ProductArt product={product} /></Link>
                            <div className="flex min-w-0 flex-1 flex-col">
                                <Link to={`/product/${id}`} className="font-semibold text-white hover:text-brand-200">{product.name}</Link>
                                <p className="text-xs text-slate-500">{product.vendor}</p>
                                <div className="mt-auto flex items-center justify-between pt-3">
                                    <div className="flex items-center rounded-lg border border-night-700">
                                        <button onClick={() => setQty(id, qty - 1)} className="p-2 text-slate-400 hover:text-white" aria-label="Decrease quantity"><Minus className="h-3.5 w-3.5" /></button>
                                        <span className="w-8 text-center text-sm text-white">{qty}</span>
                                        <button onClick={() => setQty(id, qty + 1)} className="p-2 text-slate-400 hover:text-white" aria-label="Increase quantity"><Plus className="h-3.5 w-3.5" /></button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-white">{usd(product.price * qty)}</span>
                                        <button onClick={() => remove(id)} className="text-slate-500 hover:text-red-400" aria-label={`Remove ${product.name}`}><Trash2 className="h-4 w-4" /></button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <aside className="h-fit rounded-2xl border border-night-700 bg-night-900 p-6">
                    <h2 className="font-bold text-white">Summary</h2>
                    <div className="mt-4 flex justify-between text-sm"><span className="text-slate-400">Subtotal</span><span className="text-white">{usd(subtotal)}</span></div>
                    <div className="mt-2 flex justify-between text-sm"><span className="text-slate-400">Delivery</span><span className="text-slate-400">At checkout</span></div>
                    <Link to="/checkout" className="mt-6 block rounded-xl bg-brand-600 py-3.5 text-center font-semibold text-white hover:bg-brand-500">Checkout</Link>
                    <Link to="/shop" className="mt-3 block text-center text-sm text-slate-400 hover:text-white">Continue shopping</Link>
                </aside>
            </div>
        </div>
    );
};
