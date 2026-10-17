import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, ShieldCheck, Smartphone, Truck } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/catalog';
import { CATEGORY_ICON, ProductArt, ProductCard } from '../components/Product';

const PERKS = [
    { icon: Smartphone, title: 'Pay with EcoCash', text: 'Or OneMoney, Visa and Mastercard.' },
    { icon: Truck, title: 'Delivery nationwide', text: 'Next day in Harare. Free collection points.' },
    { icon: Globe2, title: 'Send a gift home', text: 'Pay abroad, delivered to family in Zimbabwe.' },
    { icon: ShieldCheck, title: 'Verified sellers', text: 'Every seller is checked by Crestline.' },
];

export const Home = () => {
    const hero = PRODUCTS.find(p => p.id === 'sol-001');
    const deals = PRODUCTS.filter(p => p.compareAt);
    const hampers = PRODUCTS.filter(p => p.category === 'hampers');

    return (
        <>
            <section className="crest-glow">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2">
                    <div>
                        <p className="inline-flex rounded-full border border-deal-500/40 bg-deal-500/10 px-3 py-1 text-xs font-semibold text-deal-400">Load-shedding season deals</p>
                        <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
                            Power through the cuts.<br /><span className="text-brand-300">Shop it all in one place.</span>
                        </h1>
                        <p className="mt-6 max-w-xl text-lg text-slate-400">Solar kits, phones, appliances and grocery hampers from trusted Zimbabwean sellers. Pay with EcoCash or send a gift home from abroad.</p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link to="/shop?category=solar" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white hover:bg-brand-500">Shop solar <ArrowRight className="h-4 w-4" /></Link>
                            <Link to="/shop?category=hampers" className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-night-600 px-6 py-3.5 font-semibold text-slate-200 hover:border-brand-500">Send groceries home</Link>
                        </div>
                    </div>
                    <Link to={`/product/${hero.id}`} className="group block rounded-3xl border border-night-700 bg-night-900 p-4 shadow-2xl">
                        <ProductArt product={hero} size="lg" />
                        <div className="flex items-end justify-between gap-4 px-2 pt-4">
                            <div>
                                <p className="text-xs text-slate-500">{hero.vendor}</p>
                                <p className="font-semibold text-white group-hover:text-brand-200">{hero.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-slate-500 line-through">${hero.compareAt}</p>
                                <p className="font-display text-2xl font-bold text-deal-400">${hero.price}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="grid grid-cols-2 gap-4 rounded-2xl border border-night-700 bg-night-900 p-5 lg:grid-cols-4">
                    {PERKS.map(({ icon: Icon, title, text }) => (
                        <div key={title} className="flex gap-3">
                            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
                            <div><p className="text-sm font-semibold text-white">{title}</p><p className="text-xs text-slate-500">{text}</p></div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
                <h2 className="text-2xl font-bold text-white">Shop by category</h2>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {CATEGORIES.map(c => {
                        const Icon = CATEGORY_ICON[c.id];
                        return (
                            <Link key={c.id} to={`/shop?category=${c.id}`} className="rounded-2xl border border-night-700 bg-night-900 p-5 transition-colors hover:border-brand-600">
                                <Icon className="h-7 w-7 text-brand-300" />
                                <p className="mt-4 font-semibold text-white">{c.name}</p>
                                <p className="text-xs text-slate-500">{c.blurb}</p>
                            </Link>
                        );
                    })}
                </div>
            </section>

            <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
                <div className="flex items-end justify-between">
                    <h2 className="text-2xl font-bold text-white">Today’s deals</h2>
                    <Link to="/shop" className="text-sm font-semibold text-brand-300 hover:text-brand-200">See all</Link>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {deals.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </section>

            <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
                <div className="grid gap-8 rounded-3xl border border-emerald-700/30 bg-gradient-to-br from-emerald-900/30 via-night-900 to-night-900 p-8 lg:grid-cols-3 lg:p-12">
                    <div>
                        <Globe2 className="h-8 w-8 text-emerald-300" />
                        <h2 className="mt-4 text-3xl font-bold text-white">Living abroad? Look after family at home.</h2>
                        <p className="mt-3 text-slate-400">Pay by card from the UK, South Africa or anywhere. We deliver hampers to their door within 48 hours and send you a photo when it arrives.</p>
                        <Link to="/shop?category=hampers" className="mt-6 inline-flex items-center gap-2 font-semibold text-emerald-300 hover:text-emerald-200">Browse hampers <ArrowRight className="h-4 w-4" /></Link>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
                        {hampers.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                </div>
            </section>
        </>
    );
};
