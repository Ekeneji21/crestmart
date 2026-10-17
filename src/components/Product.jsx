import { Link } from 'react-router-dom';
import { Gift, Smartphone, Sofa, Sprout, Star, Sun, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { usd } from '../data/catalog';

export const CATEGORY_ICON = { solar: Sun, tech: Smartphone, home: Sofa, hampers: Gift, farm: Sprout };
const TONE = {
    solar: 'from-amber-500/25 via-night-800 to-night-900 text-amber-300',
    tech: 'from-brand-500/30 via-night-800 to-night-900 text-brand-300',
    home: 'from-rose-500/20 via-night-800 to-night-900 text-rose-300',
    hampers: 'from-emerald-500/25 via-night-800 to-night-900 text-emerald-300',
    farm: 'from-lime-500/20 via-night-800 to-night-900 text-lime-300',
};

/** Illustrated product tile (no photo dependency). */
export const ProductArt = ({ product, size = 'md' }) => {
    const Icon = CATEGORY_ICON[product.category] || Gift;
    return (
        <div className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${TONE[product.category]} ${size === 'lg' ? 'aspect-square' : 'aspect-[4/3]'}`}>
            <Icon className={size === 'lg' ? 'h-32 w-32' : 'h-14 w-14'} strokeWidth={1.25} />
            <span className="absolute bottom-3 right-3 font-display text-xs font-bold uppercase tracking-widest text-white/20">CrestMart</span>
        </div>
    );
};

export const Rating = ({ value, reviews }) => (
    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
        <Star className="h-3.5 w-3.5 fill-deal-400 text-deal-400" /> {value} <span className="text-slate-600">({reviews})</span>
    </span>
);

export const Price = ({ product, large = false }) => (
    <span className="flex items-baseline gap-2">
        <span className={`font-display font-bold text-white ${large ? 'text-3xl' : 'text-lg'}`}>{usd(product.price)}</span>
        {product.compareAt && <span className="text-sm text-slate-500 line-through">{usd(product.compareAt)}</span>}
    </span>
);

export const ProductCard = ({ product }) => {
    const { add } = useCart();
    return (
        <div className="group flex flex-col rounded-2xl border border-night-700 bg-night-900 p-3 transition-colors hover:border-brand-700/70">
            <Link to={`/product/${product.id}`} className="relative block">
                <ProductArt product={product} />
                {product.badge && <span className="absolute left-2.5 top-2.5 rounded-full bg-deal-500 px-2.5 py-0.5 text-[11px] font-bold text-night-950">{product.badge}</span>}
            </Link>
            <div className="flex flex-1 flex-col px-1 pt-3">
                <p className="text-xs text-slate-500">{product.vendor}</p>
                <Link to={`/product/${product.id}`} className="mt-0.5 line-clamp-2 font-semibold text-slate-100 group-hover:text-white">{product.name}</Link>
                <div className="mt-1"><Rating value={product.rating} reviews={product.reviews} /></div>
                <div className="mt-auto flex items-center justify-between pt-3">
                    <Price product={product} />
                    <button onClick={() => add(product.id)} className="rounded-lg bg-brand-600 p-2 text-white transition-colors hover:bg-brand-500" aria-label={`Add ${product.name} to cart`}>
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
