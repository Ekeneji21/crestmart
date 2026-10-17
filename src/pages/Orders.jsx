import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Gift, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { usd } from '../data/catalog';

const METHOD = { ecocash: 'EcoCash', onemoney: 'OneMoney', card: 'Card' };
const date = (iso) => new Date(iso).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const OrderCard = ({ order, highlight }) => (
    <div className={`rounded-2xl border bg-night-900 p-6 ${highlight ? 'border-mint-400/50' : 'border-night-700'}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
                <p className="font-mono text-sm text-slate-400">{order.id}</p>
                <p className="text-xs text-slate-500">{date(order.placedAt)}</p>
            </div>
            <span className="rounded-full border border-emerald-700/50 bg-emerald-900/40 px-2.5 py-0.5 text-xs text-emerald-300">Paid · {METHOD[order.payment.method]}</span>
        </div>
        <ul className="mt-4 space-y-1 text-sm">
            {order.lines.map(l => <li key={l.id} className="flex justify-between gap-3"><span className="text-slate-300">{l.qty} × {l.name}</span><span className="text-slate-400">{usd(l.price * l.qty)}</span></li>)}
        </ul>
        <div className="mt-4 grid gap-3 border-t border-night-700 pt-4 text-sm sm:grid-cols-2">
            <p className="text-slate-400"><span className="block text-xs uppercase tracking-wider text-slate-500">Delivery</span>{order.delivery.zone}, {order.delivery.eta.toLowerCase()}<br />{order.delivery.address}</p>
            {order.gift && <p className="text-slate-400"><span className="flex items-center gap-1 text-xs uppercase tracking-wider text-emerald-400"><Gift className="h-3 w-3" /> Gift for</span>{order.gift.recipient} · {order.gift.phone}</p>}
        </div>
        <p className="mt-4 text-right font-bold text-white">Total {usd(order.total)}</p>
    </div>
);

export const Orders = () => {
    const { id } = useParams();
    const { orders } = useCart();
    const current = id && orders.find(o => o.id === id);

    return (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
            {current && (
                <div className="mb-10 text-center">
                    <CheckCircle2 className="mx-auto h-14 w-14 text-mint-400" />
                    <h1 className="mt-4 text-3xl font-bold text-white">Thank you, {current.customer.name.split(' ')[0]}!</h1>
                    <p className="mt-2 text-slate-400">Order {current.id} is confirmed. {current.gift ? `We'll SMS ${current.gift.recipient} when it's on the way.` : "We'll SMS you when it's on the way."}</p>
                </div>
            )}
            <h2 className="text-xl font-bold text-white">{current ? 'Order details' : 'Your orders'}</h2>
            {orders.length === 0 ? (
                <div className="mt-10 text-center">
                    <Package className="mx-auto h-10 w-10 text-slate-600" />
                    <p className="mt-3 text-slate-400">No orders yet.</p>
                    <Link to="/shop" className="mt-4 inline-block font-semibold text-brand-300 hover:text-brand-200">Start shopping</Link>
                </div>
            ) : (
                <div className="mt-6 space-y-4">
                    {(current ? [current] : orders).map(o => <OrderCard key={o.id} order={o} highlight={o.id === id} />)}
                    {current && orders.length > 1 && <Link to="/orders" className="block text-center text-sm text-slate-400 hover:text-white">See all orders</Link>}
                </div>
            )}
        </div>
    );
};
