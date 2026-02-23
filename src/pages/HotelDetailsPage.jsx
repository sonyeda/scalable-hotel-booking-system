import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_HOTELS, AMENITY_ICONS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function HotelDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const hotel = MOCK_HOTELS.find(h => h.id === parseInt(id));
    const [activeImage, setActiveImage] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState(null);

    if (!hotel) {
        return (
            <div style={{ paddingTop: '8rem', textAlign: 'center', minHeight: '100vh' }}>
                <h2>Hotel not found</h2>
            </div>
        );
    }

    const handleBookRoom = (room) => {
        if (!user) {
            navigate('/login');
            return;
        }
        navigate(`/checkout?hotelId=${hotel.id}&roomId=${room.id}`);
    };

    return (
        <div style={{ paddingTop: '5rem', minHeight: '100vh', background: 'var(--color-slate-50)' }}>
            <div className="page-container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
                {/* Breadcrumb */}
                <div style={{ fontSize: '0.85rem', color: 'var(--color-slate-400)', marginBottom: '1.5rem' }}>
                    <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
                    {' / '}
                    <span style={{ cursor: 'pointer' }} onClick={() => navigate('/search')}>Hotels</span>
                    {' / '}
                    <span style={{ color: 'var(--color-slate-700)' }}>{hotel.name}</span>
                </div>

                {/* Image Gallery */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '2rem', borderRadius: 20, overflow: 'hidden' }}>
                    <motion.div
                        style={{ position: 'relative', height: 420, overflow: 'hidden', borderRadius: '20px 0 0 20px' }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeImage}
                                src={hotel.images[activeImage]}
                                alt={hotel.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </AnimatePresence>
                    </motion.div>
                    <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '1rem' }}>
                        {hotel.images.slice(1, 3).map((img, i) => (
                            <div
                                key={i}
                                style={{
                                    overflow: 'hidden', cursor: 'pointer',
                                    borderRadius: i === 0 ? '0 20px 0 0' : '0 0 20px 0',
                                    border: activeImage === i + 1 ? '3px solid #14b8a6' : '3px solid transparent',
                                }}
                                onClick={() => setActiveImage(i + 1)}
                            >
                                <img
                                    src={img}
                                    alt=""
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Thumbnail Strip */}
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', justifyContent: 'center' }}>
                    {hotel.images.map((img, i) => (
                        <div
                            key={i}
                            onClick={() => setActiveImage(i)}
                            style={{
                                width: 64, height: 44, borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
                                border: activeImage === i ? '2px solid #14b8a6' : '2px solid var(--color-slate-200)',
                                opacity: activeImage === i ? 1 : 0.6, transition: 'all 0.2s',
                            }}
                        >
                            <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    {/* Left: Details */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div>
                                <h1 style={{ fontSize: '2rem', color: 'var(--color-navy-900)', marginBottom: '0.5rem' }}>
                                    {hotel.name}
                                </h1>
                                <p style={{ color: 'var(--color-slate-500)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    📍 {hotel.address}
                                </p>
                            </div>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                background: 'var(--color-slate-100)', padding: '0.5rem 1rem', borderRadius: 12,
                            }}>
                                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy-900)' }}>⭐ {hotel.rating}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>({hotel.reviewCount} reviews)</span>
                            </div>
                        </div>

                        <p style={{ color: 'var(--color-slate-600)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1rem' }}>
                            {hotel.description}
                        </p>

                        {/* Amenities */}
                        <h3 style={{ fontSize: '1.15rem', color: 'var(--color-navy-900)', marginBottom: '1rem' }}>
                            Amenities & Facilities
                        </h3>
                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                            gap: '0.75rem', marginBottom: '2.5rem',
                        }}>
                            {hotel.amenities.map(a => (
                                <div
                                    key={a}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        padding: '0.75rem 1rem', background: 'white',
                                        borderRadius: 12, border: '1px solid var(--color-slate-200)',
                                    }}
                                >
                                    <span>{AMENITY_ICONS[a] || '✓'}</span>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--color-slate-700)' }}>{a}</span>
                                </div>
                            ))}
                        </div>

                        {/* Rooms */}
                        <h3 style={{ fontSize: '1.15rem', color: 'var(--color-navy-900)', marginBottom: '1rem' }}>
                            Available Rooms
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {hotel.rooms.map(room => (
                                <motion.div
                                    key={room.id}
                                    whileHover={{ scale: 1.01 }}
                                    onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                                    className="card"
                                    style={{
                                        padding: '1.25rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        border: selectedRoom === room.id ? '2px solid #14b8a6' : '2px solid transparent',
                                    }}
                                >
                                    <div>
                                        <h4 style={{ fontSize: '1.05rem', color: 'var(--color-navy-900)', marginBottom: '0.375rem' }}>
                                            {room.type}
                                        </h4>
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--color-slate-500)' }}>
                                            <span>👤 Up to {room.maxGuests} guests</span>
                                            <span>📐 {room.size}</span>
                                        </div>
                                        {room.available <= 3 && (
                                            <span className="badge badge-rose" style={{ marginTop: '0.5rem' }}>
                                                🔥 Only {room.available} left!
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-navy-900)' }}>
                                            ₹{room.price.toLocaleString()}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', marginBottom: '0.5rem' }}>per night</div>
                                        <button
                                            className="btn-primary"
                                            onClick={(e) => { e.stopPropagation(); handleBookRoom(room); }}
                                            style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem', borderRadius: 999 }}
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Price Card */}
                    <div style={{ position: 'sticky', top: '5.5rem', height: 'fit-content' }}>
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>Starting from</span>
                                <div>
                                    <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-navy-900)' }}>
                                        ₹{hotel.priceStart.toLocaleString()}
                                    </span>
                                    <span style={{ color: 'var(--color-slate-400)' }}> /night</span>
                                </div>
                            </div>

                            <div style={{
                                background: 'var(--color-slate-50)', borderRadius: 12, padding: '1rem',
                                marginBottom: '1rem',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                    <span style={{ color: 'var(--color-slate-500)' }}>Rating</span>
                                    <span style={{ fontWeight: 600 }}>⭐ {hotel.rating}/5</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                    <span style={{ color: 'var(--color-slate-500)' }}>Reviews</span>
                                    <span style={{ fontWeight: 600 }}>{hotel.reviewCount}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                    <span style={{ color: 'var(--color-slate-500)' }}>Room Types</span>
                                    <span style={{ fontWeight: 600 }}>{hotel.rooms.length}</span>
                                </div>
                            </div>

                            <button
                                className="btn-primary"
                                onClick={() => {
                                    const el = document.querySelector('h3');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                style={{ width: '100%', padding: '0.875rem', fontSize: '1rem' }}
                            >
                                Select a Room
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
