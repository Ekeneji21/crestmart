import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { CreditCard, Crown, Gift, Loader2, Lock, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DELIVERY_ZONES, MARKETPLACE, usd } from '../data/catalog';

const METHODS = [
    { id: 'ecocash', label: 'EcoCash', icon: Smartphone },
    { id: 'onemoney', label: 'OneMoney', icon: Smartphone },
    { id: 'card', label: 'Card', icon: CreditCard },
];
const FREE_DELIVERY_OVER = 50;
const field = 'block w-full rounded-lg border border-night-700 bg-night-950 px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-brand-500 focus:outline-none';

const Field = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-300">{label}</label>
        <input id={id} className={field} {...props} />
    </div>
);

export const Checkout = () => {
    const { lines, subtotal, placeOrder } = useCart();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', phone: '', address: '', zone: 'harare', gift: false, recipient: '', recipientPhone: '', note: '', plus: false, method: 'ecocash', payPhone: '' });
    const [error, setError] = useState('');
    const [paying, setPaying] = useState(false);

    if (lines.length === 0 && !paying) return <Navigate to="/cart" replace />;

    const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
    const zone = DELIVERY_ZONES.find(z => z.id === form.zone);
    const freeDelivery = form.plus && subtotal >= FREE_DELIVERY_OVER;
    const delivery = freeDelivery ? 0 : zone.fee;
    const plusFee = form.plus ? MARKETPLACE.plusPrice : 0;
    const total = subtotal + delivery + plusFee;

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        const mobile = form.method !== 'card';
        if (!form.name || !form.phone || (form.zone !== 'collect' && !form.address)) return setError('Please fill in your name, phone and delivery address.');
        if (form.gift && (!form.recipient || !form.recipientPhone)) return setError('Add the name and phone number of the person receiving the gift.');
        if (mobile && !/^(\+?263|0)7\d{8}$/.test(form.payPhone.replace(/\s/g, ''))) return setError('Enter a valid EcoCash or OneMoney number, e.g. 077 123 4567.');

        setPaying(true);
        // Demo store: payment is simulated. In production this calls Paynow (see README).
        await new Promise(r => setTimeout(r, 1500));
        const order = placeOrder({
            customer: { name: form.name, phone: form.phone },
            delivery: { zone: zone.name, eta: zone.eta, address: form.zone === 'collect' ? 'Collection point' : form.address, fee: delivery },
            gift: form.gift ? { recipient: form.recipient, phone: form.recipientPhone, note: form.note } : null,
            plus: form.plus,
            plusFee,
            total,
            payment: { method: form.method, status: 'paid', reference: `SIM-${Date.now()}` },
        });
        navigate(`/orders/${order.id}`, { replace: true });
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <h1 className="text-3xl font-bold text-white">Checkout</h1>
            <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-3" noValidate>
                <div className="space-y-6 lg:col-span-2">
                    <section className="rounded-2xl border border-night-700 bg-night-900 p-6">
                        <h2 className="font-bold text-white">Your details</h2>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <Field id="name" label="Full name" value={form.name} onChange={set('name')} autoComplete="name" />
                            <Field id="phone" label="Phone" type="tel" placeholder="+263 77…" value={form.phone} onChange={set('phone')} autoComplete="tel" />
                        </div>
                        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-emerald-700/40 bg-emerald-900/15 p-4">
                            <input type="checkbox" checked={form.gift} onChange={set('gift')} className="mt-1 h-4 w-4 accent-emerald-500" />
                            <span>
                                <span className="flex items-center gap-2 font-semibold text-white"><Gift className="h-4 w-4 text-emerald-300" /> This is a gift for someone in Zimbabwe</span>
                                <span className="text-sm text-slate-400">We deliver to them and send you a photo on arrival.</span>
                            </span>
                        </label>
                        {form.gift && (
                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                <Field id="recipient" label="Recipient's name" value={form.recipient} onChange={set('recipient')} />
                                <Field id="rphone" label="Recipient's phone" type="tel" value={form.recipientPhone} onChange={set('recipientPhone')} />
                                <div className="sm:col-span-2"><Field id="note" label="Gift message (optional)" value={form.note} onChange={set('note')} /></div>
                            </div>
                        )}
                    </section>

                    <section className="rounded-2xl border border-night-700 bg-night-900 p-6">
                        <h2 className="font-bold text-white">Delivery</h2>
                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                            {DELIVERY_ZONES.map(z => (
                                <label key={z.id} className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-sm ${form.zone === z.id ? 'border-brand-500 bg-brand-600/15' : 'border-night-700'}`}>
                                    <span className="flex items-center gap-2">
                                        <input type="radio" name="zone" value={z.id} checked={form.zone === z.id} onChange={set('zone')} className="accent-brand-500" />
                                        <span><span className="block text-white">{z.name}</span><span className="text-xs text-slate-500">{z.eta}</span></span>
                                    </span>
                                    <span className="text-slate-300">{z.fee ? usd(z.fee) : 'Free'}</span>
                                </label>
                            ))}
                        </div>
                        {form.zone !== 'collect' && <div className="mt-4"><Field id="address" label="Delivery address" placeholder="House number, street, suburb, town" value={form.address} onChange={set('address')} autoComplete="street-address" /></div>}
                    </section>

                    <section className="rounded-2xl border border-night-700 bg-night-900 p-6">
                        <h2 className="font-bold text-white">Payment</h2>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                            {METHODS.map(({ id, label, icon: Icon }) => (
                                <button type="button" key={id} onClick={() => setForm({ ...form, method: id })} aria-pressed={form.method === id}
                                    className={`flex flex-col items-start rounded-xl border p-3 text-left ${form.method === id ? 'border-brand-500 bg-brand-600/15' : 'border-night-700 hover:border-night-600'}`}>
                                    <Icon className="h-4 w-4 text-brand-300" />
                                    <span className="mt-1.5 text-sm font-semibold text-white">{label}</span>
                                </button>
                            ))}
                        </div>
                        {form.method !== 'card'
                            ? <div className="mt-4"><Field id="payphone" label="Mobile money number" type="tel" placeholder="077 123 4567" value={form.payPhone} onChange={set('payPhone')} /></div>
                            : <p className="mt-4 text-sm text-slate-400">You'll complete card payment on the secure Paynow page.</p>}
                    </section>
                </div>

                <aside className="h-fit space-y-4 lg:sticky lg:top-24">
                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-deal-500/40 bg-deal-500/10 p-4">
                        <input type="checkbox" checked={form.plus} onChange={set('plus')} className="mt-1 h-4 w-4 accent-amber-500" />
                        <span>
                            <span className="flex items-center gap-2 font-semibold text-white"><Crown className="h-4 w-4 text-deal-400" /> Add CrestMart Plus, {usd(MARKETPLACE.plusPrice)}/month</span>
                            <span className="text-sm text-slate-400">Free delivery on orders over ${FREE_DELIVERY_OVER}, early access to deals.</span>
                        </span>
                    </label>
                    <div className="rounded-2xl border border-night-700 bg-night-900 p-6">
                        <h2 className="font-bold text-white">Order summary</h2>
                        <ul className="mt-4 space-y-2 text-sm">
                            {lines.map(({ id, qty, product }) => (
                                <li key={id} className="flex justify-between gap-3"><span className="text-slate-400">{qty} × {product.name}</span><span className="shrink-0 text-slate-200">{usd(product.price * qty)}</span></li>
                            ))}
                        </ul>
                        <div className="mt-4 space-y-2 border-t border-night-700 pt-4 text-sm">
                            <div className="flex justify-between"><span className="text-slate-400">Subtotal</span><span>{usd(subtotal)}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Delivery</span><span>{delivery ? usd(delivery) : <span className="text-mint-400">Free</span>}</span></div>
                            {form.plus && <div className="flex justify-between"><span className="text-slate-400">CrestMart Plus (1st month)</span><span>{usd(plusFee)}</span></div>}
                            <div className="flex justify-between pt-2 text-base font-bold text-white"><span>Total</span><span>{usd(total)}</span></div>
                        </div>
                        {error && <p className="mt-4 text-sm text-red-400" role="alert">{error}</p>}
                        <button type="submit" disabled={paying} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3.5 font-semibold text-white hover:bg-brand-500 disabled:opacity-70">
                            {paying ? <><Loader2 className="h-4 w-4 animate-spin" /> Waiting for approval…</> : <>Pay {usd(total)}</>}
                        </button>
                        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500"><Lock className="h-3.5 w-3.5" /> Demo checkout: no real money moves</p>
                    </div>
                    <Link to="/cart" className="block text-center text-sm text-slate-400 hover:text-white">Back to cart</Link>
                </aside>
            </form>
        </div>
    );
};
