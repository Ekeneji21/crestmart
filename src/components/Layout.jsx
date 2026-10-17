import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/catalog';

/** Crestline hexagonal "C" with a shopping-bag handle for CrestMart. */
export const CrestMark = ({ className = 'h-9 w-9' }) => (
    <svg viewBox="0 0 52 56" className={className} aria-hidden="true">
        <defs>
            <linearGradient id="cm-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#20A4FF" /><stop offset="1" stopColor="#087FF5" /></linearGradient>
            <linearGradient id="cm-bot" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0A63C9" /><stop offset="1" stopColor="#0B4E9E" /></linearGradient>
        </defs>
        <polygon points="48,15 26,2 4,15 4,28 14,28 14,20.8 26,13.8 38,20.8 48,15" fill="url(#cm-top)" />
        <polygon points="4,28 4,41 26,54 48,41 38,35.2 26,42.2 14,35.2 14,28" fill="url(#cm-bot)" />
        <polygon points="26,13.8 38,20.8 48,15 26,2" fill="#5CC2FF" opacity=".55" />
        <rect x="19" y="25" width="14" height="11" rx="2" fill="#FBBF24" />
        <path d="M22 25v-2a4 4 0 0 1 8 0v2" stroke="#FBBF24" strokeWidth="2" fill="none" />
    </svg>
);

export const Logo = () => (
    <Link to="/" className="inline-flex items-center gap-2.5" aria-label="CrestMart home">
        <CrestMark />
        <span className="leading-none">
            <span className="block font-display text-xl font-extrabold text-white">Crest<span className="text-deal-400">Mart</span></span>
            <span className="block mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">by Crestline Systems</span>
        </span>
    </Link>
);

const Header = () => {
    const { count } = useCart();
    const navigate = useNavigate();
    const [q, setQ] = useState('');
    const [open, setOpen] = useState(false);

    const search = (e) => {
        e.preventDefault();
        navigate(`/shop${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`);
        setOpen(false);
    };

    return (
        <header className="sticky top-0 z-40 border-b border-night-700/60 bg-night-950/85 backdrop-blur-lg">
            <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
                <Logo />
                <form onSubmit={search} className="relative ml-4 hidden flex-1 md:block" role="search">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        placeholder="Search inverters, phones, hampers…"
                        aria-label="Search products"
                        className="w-full max-w-xl rounded-xl border border-night-700 bg-night-900 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-600 focus:border-brand-500 focus:outline-none"
                    />
                </form>
                <nav className="ml-auto hidden items-center gap-6 text-sm font-medium lg:flex" aria-label="Main">
                    <NavLink to="/shop" className={({ isActive }) => (isActive ? 'text-white' : 'text-slate-400 hover:text-white')}>Shop</NavLink>
                    <NavLink to="/shop?category=hampers" className="text-slate-400 hover:text-white">Send home</NavLink>
                    <NavLink to="/sell" className={({ isActive }) => (isActive ? 'text-white' : 'text-slate-400 hover:text-white')}>Sell on CrestMart</NavLink>
                    <NavLink to="/orders" className={({ isActive }) => (isActive ? 'text-white' : 'text-slate-400 hover:text-white')}>Orders</NavLink>
                </nav>
                <Link to="/cart" className="relative ml-auto rounded-xl border border-night-700 bg-night-900 p-2.5 text-slate-200 hover:border-brand-500 lg:ml-0" aria-label={`Cart, ${count} items`}>
                    <ShoppingBag className="h-5 w-5" />
                    {count > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-deal-500 px-1 text-[11px] font-bold text-night-950">{count}</span>}
                </Link>
                <button className="text-slate-300 lg:hidden" onClick={() => setOpen(o => !o)} aria-label="Menu" aria-expanded={open}>
                    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>
            {open && (
                <div className="space-y-1 border-t border-night-700 px-4 py-4 lg:hidden">
                    <form onSubmit={search} className="relative mb-3 md:hidden" role="search">
                        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products" aria-label="Search products" className="w-full rounded-xl border border-night-700 bg-night-900 py-2.5 pl-10 pr-4 text-sm" />
                    </form>
                    {[['/shop', 'Shop all'], ['/shop?category=hampers', 'Send home'], ['/sell', 'Sell on CrestMart'], ['/orders', 'My orders']].map(([to, label]) => (
                        <Link key={to} to={to} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-night-800">{label}</Link>
                    ))}
                </div>
            )}
        </header>
    );
};

const Footer = () => (
    <footer className="mt-20 border-t border-night-700/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
            <div className="md:col-span-2">
                <Logo />
                <p className="mt-4 max-w-sm text-sm text-slate-500">Solar, tech and home essentials from trusted Zimbabwean sellers. Pay with EcoCash, OneMoney or card, or send a gift home from anywhere.</p>
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Shop</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-500">
                    {CATEGORIES.map(c => <li key={c.id}><Link to={`/shop?category=${c.id}`} className="hover:text-white">{c.name}</Link></li>)}
                </ul>
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">A product of</p>
                <img src="/crestline-logo.svg" alt="Crestline Systems" className="mt-3 h-9" />
                <ul className="mt-4 space-y-2 text-sm text-slate-500">
                    <li><Link to="/sell" className="hover:text-white">Become a seller</Link></li>
                    <li><Link to="/orders" className="hover:text-white">Track an order</Link></li>
                </ul>
            </div>
        </div>
        <p className="border-t border-night-800 py-5 text-center text-xs text-slate-600">© {new Date().getFullYear()} Crestline Systems, Harare. Demo store: no real payments are taken.</p>
    </footer>
);

export const Layout = ({ children }) => {
    const { pathname, search } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname, search]);
    return (
        <div className="min-h-screen">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};
