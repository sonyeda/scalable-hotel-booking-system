import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MOCK_HOTELS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function CheckoutPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const hotelId = parseInt(searchParams.get('hotelId'));
    const roomId = parseInt(searchParams.get('roomId'));

    const hotel = MOCK_HOTELS.find(h => h.id === hotelId);
    const room = hotel?.rooms?.find(r => r.id === roomId);

    const [form, setForm] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        checkIn: '',
        checkOut: '',
        specialRequests: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!hotel || !room) {
        return (
            <div style={{ paddingTop: '8rem', textAlign: 'center', minHeight: '100vh' }}>
                <h2>Invalid booking details</h2>
                <button className="btn-primary" onClick={() => navigate('/search')} style={{ marginTop: '1rem' }}>
                    Search Hotels
                </button>
            </div>
        );
    }

    const nights = form.checkIn && form.checkOut
        ? Math.max(1, Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / 86400000))
        : 1;
    const subtotal = room.price * nights;
    const taxes = Math.round(subtotal * 0.18);
    const total = subtotal + taxes;

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(() => {
            // Save booking to localStorage
            const bookings = JSON.parse(localStorage.getItem('luxestay_bookings') || '[]');
            bookings.push({
                id: Date.now(),
                hotelName: hotel.name,
                hotelImage: hotel.image,
                hotelCity: hotel.city,
                roomType: room.type,
                checkIn: form.checkIn,
                checkOut: form.checkOut,
                nights,
                total,
                status: 'Confirmed',
                bookedAt: new Date().toISOString(),
                guestName: form.fullName,
            });
            localStorage.setItem('luxestay_bookings', JSON.stringify(bookings));
            setProcessing(false);
            setSuccess(true);
        }, 2000);
    };

    if (success) {
        return (
            <div style={{ paddingTop: '5rem', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ textAlign: 'center', maxWidth: 500, padding: '3rem' }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        style={{ fontSize: '4rem', marginBottom: '1.5rem' }}
                    >
                        🎉
                    </motion.div>
                    <h1 style={{ fontSize: '2rem', color: 'var(--color-navy-900)', marginBottom: '0.75rem' }}>
                        Booking Confirmed!
                    </h1>
                    <p style={{ color: 'var(--color-slate-500)', marginBottom: '0.5rem', lineHeight: 1.7 }}>
                        Your stay at <strong>{hotel.name}</strong> has been confirmed.
                    </p>
                    <p style={{ color: 'var(--color-slate-400)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                        A confirmation email has been sent to {form.email}
                    </p>
                    <div style={{
                        background: 'var(--color-slate-50)', borderRadius: 16, padding: '1.5rem',
                        marginBottom: '2rem', textAlign: 'left',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <span style={{ color: 'var(--color-slate-500)' }}>Room</span>
                            <span style={{ fontWeight: 600 }}>{room.type}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <span style={{ color: 'var(--color-slate-500)' }}>Dates</span>
                            <span style={{ fontWeight: 600 }}>{form.checkIn} → {form.checkOut}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--color-slate-500)' }}>Total Paid</span>
                            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#14b8a6' }}>₹{total.toLocaleString()}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button className="btn-primary" onClick={() => navigate('/dashboard')}>View My Bookings</button>
                        <button className="btn-secondary" onClick={() => navigate('/')}>Home</button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '5rem', minHeight: '100vh', background: 'var(--color-slate-50)' }}>
            <div className="page-container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
                <h1 style={{ fontSize: '1.75rem', color: 'var(--color-navy-900)', marginBottom: '2rem' }}>
                    Complete Your Booking
                </h1>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                    {/* Left: Form */}
                    <div>
                        {/* Guest Details */}
                        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.05rem', color: 'var(--color-navy-900)', marginBottom: '1.25rem' }}>
                                👤 Guest Details
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={labelStyle}>Full Name *</label>
                                    <input
                                        className="input-field"
                                        required
                                        value={form.fullName}
                                        onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Email *</label>
                                    <input
                                        className="input-field"
                                        type="email" required
                                        value={form.email}
                                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                        placeholder="john@email.com"
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Phone</label>
                                    <input
                                        className="input-field"
                                        type="tel"
                                        value={form.phone}
                                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                                        placeholder="+91 9876543210"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Stay Dates */}
                        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.05rem', color: 'var(--color-navy-900)', marginBottom: '1.25rem' }}>
                                📅 Stay Dates
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={labelStyle}>Check-In *</label>
                                    <input
                                        className="input-field"
                                        type="date" required
                                        min={new Date().toISOString().split('T')[0]}
                                        value={form.checkIn}
                                        onChange={e => setForm(f => ({ ...f, checkIn: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Check-Out *</label>
                                    <input
                                        className="input-field"
                                        type="date" required
                                        min={form.checkIn || new Date().toISOString().split('T')[0]}
                                        value={form.checkOut}
                                        onChange={e => setForm(f => ({ ...f, checkOut: e.target.value }))}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Special Requests */}
                        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.05rem', color: 'var(--color-navy-900)', marginBottom: '1.25rem' }}>
                                💬 Special Requests
                            </h3>
                            <textarea
                                className="input-field"
                                rows={3}
                                value={form.specialRequests}
                                onChange={e => setForm(f => ({ ...f, specialRequests: e.target.value }))}
                                placeholder="Any special requirements..."
                                style={{ resize: 'vertical' }}
                            />
                        </div>

                        {/* Payment */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.05rem', color: 'var(--color-navy-900)', marginBottom: '1.25rem' }}>
                                💳 Payment Method
                            </h3>
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                {[
                                    { id: 'card', label: '💳 Credit/Debit Card' },
                                    { id: 'upi', label: '📱 UPI' },
                                    { id: 'netbanking', label: '🏦 Net Banking' },
                                ].map(m => (
                                    <button
                                        key={m.id}
                                        type="button"
                                        onClick={() => setPaymentMethod(m.id)}
                                        style={{
                                            padding: '0.75rem 1.25rem', borderRadius: 12, cursor: 'pointer',
                                            border: paymentMethod === m.id ? '2px solid #14b8a6' : '2px solid var(--color-slate-200)',
                                            background: paymentMethod === m.id ? 'rgba(20,184,166,0.08)' : 'white',
                                            fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                                            fontWeight: paymentMethod === m.id ? 600 : 400,
                                            color: paymentMethod === m.id ? '#14b8a6' : 'var(--color-slate-700)',
                                        }}
                                    >
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                            {paymentMethod === 'card' && (
                                <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label style={labelStyle}>Card Number</label>
                                        <input className="input-field" placeholder="4242 4242 4242 4242" />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Expiry</label>
                                        <input className="input-field" placeholder="MM/YY" />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>CVV</label>
                                        <input className="input-field" placeholder="•••" type="password" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Summary */}
                    <div style={{ position: 'sticky', top: '5.5rem', height: 'fit-content' }}>
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.05rem', color: 'var(--color-navy-900)', marginBottom: '1rem' }}>
                                Booking Summary
                            </h3>

                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                                <img src={hotel.image} alt="" style={{ width: 80, height: 60, borderRadius: 8, objectFit: 'cover' }} />
                                <div>
                                    <h4 style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>{hotel.name}</h4>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>📍 {hotel.city}</span>
                                </div>
                            </div>

                            <div style={{
                                background: 'var(--color-slate-50)', borderRadius: 12, padding: '1rem',
                                marginBottom: '1.25rem',
                            }}>
                                <div style={{ ...summaryRow, marginBottom: '0.5rem' }}>
                                    <span>Room Type</span>
                                    <span style={{ fontWeight: 600 }}>{room.type}</span>
                                </div>
                                <div style={{ ...summaryRow, marginBottom: '0.5rem' }}>
                                    <span>Price per night</span>
                                    <span>₹{room.price.toLocaleString()}</span>
                                </div>
                                <div style={{ ...summaryRow, marginBottom: '0.5rem' }}>
                                    <span>Nights</span>
                                    <span>{nights}</span>
                                </div>
                                <div style={{ ...summaryRow, marginBottom: '0.5rem' }}>
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div style={{ ...summaryRow, marginBottom: '0.5rem' }}>
                                    <span>Taxes (18% GST)</span>
                                    <span>₹{taxes.toLocaleString()}</span>
                                </div>
                                <div style={{
                                    borderTop: '2px solid var(--color-slate-200)',
                                    paddingTop: '0.75rem', marginTop: '0.5rem',
                                    display: 'flex', justifyContent: 'space-between',
                                }}>
                                    <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>Total</span>
                                    <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#14b8a6' }}>₹{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                className="btn-primary"
                                disabled={processing}
                                whileHover={!processing ? { scale: 1.02 } : {}}
                                whileTap={!processing ? { scale: 0.98 } : {}}
                                style={{
                                    width: '100%', padding: '1rem', fontSize: '1.05rem',
                                    opacity: processing ? 0.7 : 1,
                                }}
                            >
                                {processing ? '⏳ Processing Payment...' : `Pay ₹${total.toLocaleString()}`}
                            </motion.button>

                            <p style={{ textAlign: 'center', color: 'var(--color-slate-400)', fontSize: '0.75rem', marginTop: '0.75rem' }}>
                                🔒 Secured by 256-bit SSL encryption
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

const labelStyle = {
    display: 'block', fontSize: '0.8rem', fontWeight: 600,
    color: 'var(--color-slate-600)', marginBottom: '0.375rem',
};

const summaryRow = {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '0.85rem', color: 'var(--color-slate-600)',
};
