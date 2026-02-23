import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('bookings');
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        const saved = JSON.parse(localStorage.getItem('luxestay_bookings') || '[]');
        setBookings(saved);
    }, [user, navigate]);

    const cancelBooking = (id) => {
        const updated = bookings.map(b =>
            b.id === id ? { ...b, status: 'Cancelled' } : b
        );
        setBookings(updated);
        localStorage.setItem('luxestay_bookings', JSON.stringify(updated));
    };

    const upcomingBookings = bookings.filter(b => b.status === 'Confirmed' && new Date(b.checkIn) >= new Date());
    const pastBookings = bookings.filter(b => b.status !== 'Confirmed' || new Date(b.checkIn) < new Date());

    const tabs = [
        { id: 'bookings', label: '📋 All Bookings', count: bookings.length },
        { id: 'upcoming', label: '✈️ Upcoming', count: upcomingBookings.length },
        { id: 'profile', label: '👤 Profile' },
    ];

    const displayBookings = activeTab === 'upcoming' ? upcomingBookings :
        activeTab === 'bookings' ? bookings : [];

    if (!user) return null;

    return (
        <div style={{ paddingTop: '5rem', minHeight: '100vh', background: 'var(--color-slate-50)' }}>
            {/* Header */}
            <div className="gradient-hero" style={{ padding: '3rem 2rem 4rem' }}>
                <div className="page-container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div style={{
                            width: 64, height: 64, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #14b8a6, #2dd4bf)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.5rem', fontWeight: 700, color: 'white',
                        }}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.25rem' }}>
                                Welcome back, {user.name}!
                            </h1>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-container" style={{ marginTop: '-2rem', paddingBottom: '3rem' }}>
                {/* Tabs */}
                <div className="card" style={{
                    padding: '0.5rem', marginBottom: '2rem',
                    display: 'flex', gap: '0.375rem',
                }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                flex: 1, padding: '0.75rem 1rem',
                                borderRadius: 12, border: 'none', cursor: 'pointer',
                                background: activeTab === tab.id ? 'linear-gradient(135deg, #14b8a6, #2dd4bf)' : 'transparent',
                                color: activeTab === tab.id ? 'white' : 'var(--color-slate-500)',
                                fontWeight: 600, fontSize: '0.9rem',
                                fontFamily: 'var(--font-body)', transition: 'all 0.2s',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            }}
                        >
                            {tab.label}
                            {tab.count !== undefined && (
                                <span style={{
                                    background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'var(--color-slate-100)',
                                    padding: '0.125rem 0.5rem', borderRadius: 999, fontSize: '0.75rem',
                                }}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'profile' ? (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div className="card" style={{ padding: '2rem', maxWidth: 600 }}>
                                <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-navy-900)' }}>Profile Settings</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div>
                                        <label style={labelStyle}>Name</label>
                                        <input className="input-field" defaultValue={user.name} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Email</label>
                                        <input className="input-field" defaultValue={user.email} readOnly style={{ background: 'var(--color-slate-50)' }} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Phone</label>
                                        <input className="input-field" placeholder="+91 " />
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                        <button className="btn-primary">Save Changes</button>
                                        <button className="btn-secondary" onClick={() => { logout(); navigate('/'); }} style={{ color: '#f43f5e', borderColor: '#f43f5e' }}>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {displayBookings.length === 0 ? (
                                <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏨</div>
                                    <h3 style={{ color: 'var(--color-slate-700)', marginBottom: '0.5rem' }}>No bookings yet</h3>
                                    <p style={{ color: 'var(--color-slate-400)', marginBottom: '1.5rem' }}>Start exploring hotels and book your next stay!</p>
                                    <button className="btn-primary" onClick={() => navigate('/search')}>Explore Hotels</button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {displayBookings.map((booking, i) => (
                                        <motion.div
                                            key={booking.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="card"
                                            style={{ padding: '1.25rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}
                                        >
                                            <img
                                                src={booking.hotelImage}
                                                alt=""
                                                style={{ width: 120, height: 85, borderRadius: 12, objectFit: 'cover' }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <div>
                                                        <h4 style={{ fontSize: '1.05rem', color: 'var(--color-navy-900)', marginBottom: '0.25rem' }}>
                                                            {booking.hotelName}
                                                        </h4>
                                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)', marginBottom: '0.5rem' }}>
                                                            📍 {booking.hotelCity} • {booking.roomType}
                                                        </p>
                                                    </div>
                                                    <span className={`badge ${booking.status === 'Confirmed' ? 'badge-teal' : 'badge-rose'}`}>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.8rem', color: 'var(--color-slate-500)' }}>
                                                    <span>📅 {booking.checkIn} → {booking.checkOut}</span>
                                                    <span>🌙 {booking.nights} night{booking.nights > 1 ? 's' : ''}</span>
                                                    <span style={{ fontWeight: 700, color: 'var(--color-navy-900)' }}>₹{booking.total?.toLocaleString()}</span>
                                                </div>
                                            </div>
                                            {booking.status === 'Confirmed' && (
                                                <button
                                                    onClick={() => cancelBooking(booking.id)}
                                                    style={{
                                                        padding: '0.5rem 1rem', borderRadius: 10,
                                                        border: '2px solid #f43f5e', background: 'white',
                                                        color: '#f43f5e', fontSize: '0.8rem', fontWeight: 600,
                                                        cursor: 'pointer', fontFamily: 'var(--font-body)',
                                                        transition: 'all 0.2s',
                                                    }}
                                                    onMouseEnter={e => { e.target.style.background = '#f43f5e'; e.target.style.color = 'white'; }}
                                                    onMouseLeave={e => { e.target.style.background = 'white'; e.target.style.color = '#f43f5e'; }}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const labelStyle = {
    display: 'block', fontSize: '0.8rem', fontWeight: 600,
    color: 'var(--color-slate-600)', marginBottom: '0.375rem',
};
