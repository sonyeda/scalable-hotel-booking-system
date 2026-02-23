import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { MOCK_HOTELS } from '../data/mockData';

export default function AdminDashboardPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [hotels, setHotels] = useState(MOCK_HOTELS);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newHotel, setNewHotel] = useState({ name: '', city: '', priceStart: '' });

    if (!user?.isAdmin) {
        return (
            <div style={{ paddingTop: '8rem', textAlign: 'center', minHeight: '100vh' }}>
                <h2 style={{ color: 'var(--color-slate-700)' }}>🔒 Admin Access Required</h2>
                <p style={{ color: 'var(--color-slate-400)', marginTop: '0.5rem' }}>Login with an admin email to access this page.</p>
                <button className="btn-primary" onClick={() => navigate('/login')} style={{ marginTop: '1rem' }}>Login as Admin</button>
            </div>
        );
    }

    const stats = [
        { label: 'Total Hotels', value: hotels.length, icon: '🏨', color: '#14b8a6' },
        { label: 'Total Rooms', value: hotels.reduce((s, h) => s + h.rooms.length, 0), icon: '🛏️', color: '#eab308' },
        { label: 'Available', value: hotels.reduce((s, h) => s + h.rooms.reduce((rs, r) => rs + r.available, 0), 0), icon: '✅', color: '#22c55e' },
        { label: 'Avg. Rating', value: (hotels.reduce((s, h) => s + h.rating, 0) / hotels.length).toFixed(1), icon: '⭐', color: '#f59e0b' },
    ];

    const handleAddHotel = (e) => {
        e.preventDefault();
        const hotel = {
            id: Date.now(),
            name: newHotel.name,
            city: newHotel.city,
            address: `${newHotel.city}, India`,
            description: `Welcome to ${newHotel.name}, a premium hotel in ${newHotel.city}.`,
            rating: 4.5,
            reviewCount: 0,
            priceStart: parseInt(newHotel.priceStart) || 5000,
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
            images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'],
            amenities: ['WiFi', 'AC', 'Restaurant'],
            rooms: [{ id: Date.now(), type: 'Standard Room', price: parseInt(newHotel.priceStart) || 5000, available: 10, maxGuests: 2, size: '30 sqm' }],
        };
        setHotels([hotel, ...hotels]);
        setNewHotel({ name: '', city: '', priceStart: '' });
        setShowAddForm(false);
    };

    const deleteHotel = (id) => {
        setHotels(hotels.filter(h => h.id !== id));
    };

    return (
        <div style={{ paddingTop: '5rem', minHeight: '100vh', background: 'var(--color-slate-50)' }}>
            {/* Admin Header */}
            <div className="gradient-hero" style={{ padding: '2.5rem 2rem 3.5rem' }}>
                <div className="page-container">
                    <h1 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>Manage hotels, rooms, and pricing</p>
                </div>
            </div>

            <div className="page-container" style={{ marginTop: '-1.5rem', paddingBottom: '3rem' }}>
                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="card"
                            style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
                        >
                            <div style={{
                                width: 48, height: 48, borderRadius: 12,
                                background: `${s.color}15`, display: 'flex',
                                alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem',
                            }}>
                                {s.icon}
                            </div>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-navy-900)' }}>{s.value}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>{s.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--color-navy-900)' }}>Hotels</h2>
                    <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)} style={{ fontSize: '0.9rem', padding: '0.5rem 1.25rem' }}>
                        {showAddForm ? '✕ Cancel' : '+ Add Hotel'}
                    </button>
                </div>

                {/* Add Form */}
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="card"
                        style={{ padding: '1.5rem', marginBottom: '1.5rem' }}
                    >
                        <form onSubmit={handleAddHotel} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                            <div style={{ flex: 1 }}>
                                <label style={labelStyle}>Hotel Name</label>
                                <input className="input-field" required value={newHotel.name} onChange={e => setNewHotel(h => ({ ...h, name: e.target.value }))} placeholder="e.g. The Grand" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={labelStyle}>City</label>
                                <input className="input-field" required value={newHotel.city} onChange={e => setNewHotel(h => ({ ...h, city: e.target.value }))} placeholder="e.g. Mumbai" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={labelStyle}>Starting Price (₹)</label>
                                <input className="input-field" type="number" required value={newHotel.priceStart} onChange={e => setNewHotel(h => ({ ...h, priceStart: e.target.value }))} placeholder="e.g. 8000" />
                            </div>
                            <button type="submit" className="btn-primary" style={{ padding: '0.875rem 1.5rem', whiteSpace: 'nowrap' }}>Add Hotel</button>
                        </form>
                    </motion.div>
                )}

                {/* Hotels Table */}
                <div className="card" style={{ overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ background: 'var(--color-slate-50)' }}>
                                <th style={thStyle}>Hotel</th>
                                <th style={thStyle}>City</th>
                                <th style={thStyle}>Rating</th>
                                <th style={thStyle}>Rooms</th>
                                <th style={thStyle}>Starting Price</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotels.map((hotel, i) => (
                                <motion.tr
                                    key={hotel.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    style={{ borderBottom: '1px solid var(--color-slate-100)' }}
                                >
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <img src={hotel.image} alt="" style={{ width: 48, height: 36, borderRadius: 6, objectFit: 'cover' }} />
                                            <span style={{ fontWeight: 600 }}>{hotel.name}</span>
                                        </div>
                                    </td>
                                    <td style={tdStyle}>{hotel.city}</td>
                                    <td style={tdStyle}>⭐ {hotel.rating}</td>
                                    <td style={tdStyle}>{hotel.rooms.length} types</td>
                                    <td style={tdStyle}>₹{hotel.priceStart.toLocaleString()}</td>
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => navigate(`/hotel/${hotel.id}`)}
                                                style={{ ...actionBtn, color: '#14b8a6', borderColor: '#14b8a6' }}
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => deleteHotel(hotel.id)}
                                                style={{ ...actionBtn, color: '#f43f5e', borderColor: '#f43f5e' }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const labelStyle = {
    display: 'block', fontSize: '0.8rem', fontWeight: 600,
    color: 'var(--color-slate-600)', marginBottom: '0.375rem',
};

const thStyle = {
    padding: '0.875rem 1rem', textAlign: 'left',
    fontSize: '0.75rem', fontWeight: 600,
    color: 'var(--color-slate-500)', textTransform: 'uppercase',
    letterSpacing: '0.05em',
};

const tdStyle = {
    padding: '0.875rem 1rem', color: 'var(--color-slate-700)',
};

const actionBtn = {
    padding: '0.375rem 0.75rem', borderRadius: 8,
    border: '1.5px solid', background: 'white',
    fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
    fontFamily: 'var(--font-body)', transition: 'all 0.2s',
};
