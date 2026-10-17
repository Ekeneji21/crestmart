import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Check, Minus, Plus, ShieldCheck, Store, Truck } from 'lucide-react';
import { PRODUCTS, categoryName, findProduct } from '../data/catalog';
import { useCart } from '../context/CartContext';
import { Price, ProductArt, ProductCard, Rating } from '../components/Product';

export const ProductPage = () => {
    const { id } = useParams();
    const product = findProduct(id);
    const { add } = useCart();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);

    if (!product) return <Navigate to="/shop" replace />;
    const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const addToCart = () => { add(product.id, qty); setAdded(true); setTimeout(() => setAdded(false), 2000); };

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
                <Link to="/shop" className="hover:text-white">Shop</Link> / <Link to={`/shop?category=${product.category}`} className="hover:text-white">{categoryName(product.category)}</Link>
            </nav>
            <div className="mt-6 grid gap-10 lg:grid-cols-2">
                <div className="rounded-3xl border border-night-700 bg-night-900 p-4"><ProductArt product={product} size="lg" /></div>
                <div>
                    {product.badge && <span className="rounded-full bg-deal-500 px-2.5 py-0.5 text-xs font-bold text-night-950">{product.badge}</span>}
                    <h1 className="mt-3 text-3xl font-bold text-white">{product.name}</h1>
                    <div className="mt-2 flex items-center gap-3 text-sm text-slate-400">
                        <Rating value={product.rating} reviews={product.reviews} />
                        <span className="inline-flex items-center gap-1"><Store className="h-3.5 w-3.5" /> {product.vendor}</span>
                    </div>
                    <div className="mt-6"><Price product={product} large /></div>
                    {product.compareAt && <p className="mt-1 text-sm font-semibold text-deal-400">You save ${(product.compareAt - product.price).toFixed(2)}</p>}
                    <p className="mt-6 text-slate-300">{product.blurb}</p>
                    <ul className="mt-6 space-y-2 text-sm text-slate-300">
                        {product.specs.map(s => <li key={s} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-400" /> {s}</li>)}
                    </ul>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <div className="flex items-center rounded-xl border border-night-700 bg-night-900">
                            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-3 text-slate-400 hover:text-white" aria-label="Decrease quantity"><Minus className="h-4 w-4" /></button>
                            <span className="w-10 text-center font-semibold text-white" aria-live="polite">{qty}</span>
                            <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="p-3 text-slate-400 hover:text-white" aria-label="Increase quantity"><Plus className="h-4 w-4" /></button>
                        </div>
                        <button onClick={addToCart} className="flex-1 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white hover:bg-brand-500 sm:flex-none">{added ? 'Added ✓' : 'Add to cart'}</button>
                        <button onClick={() => { add(product.id, qty); navigate('/checkout'); }} className="rounded-xl border border-deal-500/60 px-6 py-3.5 font-semibold text-deal-400 hover:bg-deal-500/10">Buy now</button>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">{product.stock < 10 ? `Only ${product.stock} left` : 'In stock'}</p>

                    <div className="mt-8 grid gap-3 rounded-2xl border border-night-700 bg-night-900 p-4 text-sm sm:grid-cols-2">
                        <p className="flex gap-2 text-slate-300"><Truck className="h-4 w-4 shrink-0 text-brand-300" /> Next-day delivery in Harare</p>
                        <p className="flex gap-2 text-slate-300"><ShieldCheck className="h-4 w-4 shrink-0 text-brand-300" /> Buyer protection on every order</p>
                    </div>
                </div>
            </div>

            {related.length > 0 && (
                <section className="mt-16">
                    <h2 className="text-xl font-bold text-white">You may also like</h2>
                    <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">{related.map(p => <ProductCard key={p.id} product={p} />)}</div>
                </section>
            )}
        </div>
    );
};
