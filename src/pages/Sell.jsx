import { BarChart3, Check, Crown, Store, Wallet } from 'lucide-react';
import { MARKETPLACE } from '../data/catalog';

const STEPS = [
    { icon: Store, title: 'List your products', text: 'Upload products from your phone. Crestline verifies your business in 48 hours.' },
    { icon: Wallet, title: 'Get paid to EcoCash', text: 'Customers pay upfront. Your earnings land weekly, or in 48 hours on Pro.' },
    { icon: BarChart3, title: 'Grow with data', text: 'See what sells, when, and where. Promote best-sellers on the Deals page.' },
];

export const Sell = () => (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-deal-400">Sell on CrestMart</p>
            <h1 className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">Reach buyers across Zimbabwe and the diaspora</h1>
            <p className="mt-4 text-lg text-slate-400">No setup fees. You only pay a small commission when you sell.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-night-700 bg-night-900 p-6">
                    <Icon className="h-6 w-6 text-brand-300" />
                    <h2 className="mt-4 font-semibold text-white">{title}</h2>
                    <p className="mt-2 text-sm text-slate-400">{text}</p>
                </div>
            ))}
        </div>

        <h2 className="mt-16 text-2xl font-bold text-white">Seller plans</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:max-w-4xl">
            {MARKETPLACE.sellerPlans.map((p, i) => (
                <div key={p.name} className={`rounded-2xl border p-6 ${i === 1 ? 'border-brand-500/70 bg-gradient-to-b from-brand-900/40 to-night-900' : 'border-night-700 bg-night-900'}`}>
                    <h3 className="text-lg font-bold text-white">{p.name}</h3>
                    <p className="mt-3"><span className="font-display text-4xl font-extrabold text-white">{p.price ? `$${p.price}` : 'Free'}</span>{p.price > 0 && <span className="text-sm text-slate-500"> / month</span>}</p>
                    <p className="mt-1 text-sm text-deal-400">{p.commission} commission per sale</p>
                    <ul className="mt-5 space-y-2 text-sm text-slate-300">{p.perks.map(x => <li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-mint-400" /> {x}</li>)}</ul>
                </div>
            ))}
        </div>

        <div className="mt-16 flex flex-col gap-6 rounded-3xl border border-deal-500/30 bg-deal-500/5 p-8 md:flex-row md:items-center">
            <Crown className="h-10 w-10 shrink-0 text-deal-400" />
            <div>
                <h2 className="text-xl font-bold text-white">CrestMart Plus for shoppers, ${MARKETPLACE.plusPrice}/month</h2>
                <p className="mt-1 text-sm text-slate-400">{MARKETPLACE.plusPerks.join(' · ')}. Shoppers add it at checkout.</p>
            </div>
        </div>
        <p className="mt-10 text-sm text-slate-500">To become a seller, contact Crestline Systems. Seller sign-up is coming to this page.</p>
    </div>
);
