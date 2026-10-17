import { useSearchParams } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { CATEGORIES, PRODUCTS, categoryName } from '../data/catalog';
import { ProductCard } from '../components/Product';

const SORTS = {
    featured: (a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0) || b.reviews - a.reviews,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating,
};

export const Shop = () => {
    const [params, setParams] = useSearchParams();
    const category = params.get('category') || '';
    const q = (params.get('q') || '').toLowerCase();
    const sort = params.get('sort') || 'featured';

    const update = (key, value) => {
        const next = new URLSearchParams(params);
        if (value) next.set(key, value); else next.delete(key);
        setParams(next);
    };

    const results = PRODUCTS
        .filter(p => !category || p.category === category)
        .filter(p => !q || `${p.name} ${p.vendor} ${p.blurb}`.toLowerCase().includes(q))
        .sort(SORTS[sort] || SORTS.featured);

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <h1 className="text-3xl font-bold text-white">{q ? `Results for “${params.get('q')}”` : category ? categoryName(category) : 'All products'}</h1>
            <p className="mt-1 text-sm text-slate-500">{results.length} products</p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                    {[{ id: '', name: 'All' }, ...CATEGORIES].map(c => (
                        <button
                            key={c.id || 'all'}
                            onClick={() => update('category', c.id)}
                            aria-pressed={category === c.id}
                            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${category === c.id ? 'border-brand-500 bg-brand-600/20 text-white' : 'border-night-700 text-slate-400 hover:text-white'}`}
                        >
                            {c.name}
                        </button>
                    ))}
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-400">
                    Sort
                    <select value={sort} onChange={e => update('sort', e.target.value === 'featured' ? '' : e.target.value)} className="rounded-lg border border-night-700 bg-night-900 px-3 py-2 text-slate-200">
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price: low to high</option>
                        <option value="price-desc">Price: high to low</option>
                        <option value="rating">Top rated</option>
                    </select>
                </label>
            </div>

            {results.length === 0 ? (
                <div className="mt-16 text-center">
                    <SearchX className="mx-auto h-10 w-10 text-slate-600" />
                    <p className="mt-3 font-semibold text-white">No products match</p>
                    <button onClick={() => setParams({})} className="mt-2 text-sm text-brand-300 hover:text-brand-200">Clear filters</button>
                </div>
            ) : (
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {results.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            )}
        </div>
    );
};
