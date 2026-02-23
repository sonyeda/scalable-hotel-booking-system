import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import HotelCard from '../components/HotelCard';
import { MOCK_HOTELS, POPULAR_DESTINATIONS } from '../data/mockData';

export default function HomePage() {
    return (
        <div>
            {/* Hero Section */}
            <section className="gradient-hero" style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '8rem 2rem 4rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Animated Background Shapes */}
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                    <motion.div
                        animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute', top: '10%', right: '10%',
                            width: 300, height: 300, borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(20,184,166,0.15), transparent 70%)',
                        }}
                    />
                    <motion.div
                        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute', bottom: '20%', left: '5%',
                            width: 400, height: 400, borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(234,179,8,0.1), transparent 70%)',
                        }}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', maxWidth: 800, position: 'relative', zIndex: 1 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="badge badge-teal"
                        style={{ marginBottom: '1.5rem', fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}
                    >
                        ✦ Premium Hotel Experiences
                    </motion.div>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 800,
                        color: 'white',
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                    }}>
                        Discover Your Perfect{' '}
                        <span className="gradient-text">Luxury Stay</span>
                    </h1>
                    <p style={{
                        fontSize: '1.15rem',
                        color: 'rgba(255,255,255,0.65)',
                        lineHeight: 1.7,
                        marginBottom: '3rem',
                        maxWidth: 600,
                        margin: '0 auto 3rem',
                    }}>
                        From beachfront villas in Goa to palace hotels in Udaipur — find and book
                        extraordinary accommodations at the best prices.
                    </p>
                </motion.div>

                <div style={{ width: '100%', maxWidth: 960, position: 'relative', zIndex: 1 }}>
                    <SearchBar variant="hero" />
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    style={{
                        display: 'flex', gap: '3rem', marginTop: '4rem',
                        flexWrap: 'wrap', justifyContent: 'center',
                    }}
                >
                    {[
                        { value: '500+', label: 'Luxury Hotels' },
                        { value: '50K+', label: 'Happy Guests' },
                        { value: '30+', label: 'Cities' },
                        { value: '4.8', label: 'Avg Rating ⭐' },
                    ].map((s, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#2dd4bf' }}>{s.value}</div>
                            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* Popular Destinations */}
            <section className="page-container" style={{ padding: '5rem 1.5rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="badge badge-teal" style={{ marginBottom: '0.75rem' }}>🌍 Explore</span>
                    <h2 style={{ fontSize: '2rem', color: 'var(--color-navy-900)', marginBottom: '0.5rem' }}>
                        Popular Destinations
                    </h2>
                    <p style={{ color: 'var(--color-slate-500)', marginBottom: '2.5rem', maxWidth: 500 }}>
                        Handpicked cities with the finest hotel collections
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5rem',
                }}>
                    {POPULAR_DESTINATIONS.map((dest, i) => (
                        <motion.div
                            key={dest.city}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link to={`/search?city=${dest.city}`} style={{ textDecoration: 'none' }}>
                                <div className="card" style={{ position: 'relative', height: 220, cursor: 'pointer' }}>
                                    <img
                                        src={dest.image}
                                        alt={dest.city}
                                        loading="lazy"
                                        style={{
                                            width: '100%', height: '100%', objectFit: 'cover',
                                            transition: 'transform 0.5s',
                                        }}
                                        onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                                        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                    />
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                                    }} />
                                    <div style={{
                                        position: 'absolute', bottom: 16, left: 16, right: 16, color: 'white',
                                    }}>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{dest.city}</h3>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', opacity: 0.85 }}>
                                            <span>From ₹{dest.priceFrom.toLocaleString()}/night</span>
                                            <span>{dest.hotels} hotels</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Featured Hotels */}
            <section style={{ background: 'var(--color-slate-100)', padding: '5rem 0' }}>
                <div className="page-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>⭐ Featured</span>
                        <h2 style={{ fontSize: '2rem', color: 'var(--color-navy-900)', marginBottom: '0.5rem' }}>
                            Featured Hotels
                        </h2>
                        <p style={{ color: 'var(--color-slate-500)', marginBottom: '2.5rem', maxWidth: 500 }}>
                            Our top-rated properties loved by travelers worldwide
                        </p>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                        gap: '1.5rem',
                    }}>
                        {MOCK_HOTELS.slice(0, 3).map((hotel, i) => (
                            <HotelCard key={hotel.id} hotel={hotel} index={i} />
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                        <Link to="/search" className="btn-secondary" style={{ textDecoration: 'none' }}>
                            View All Hotels →
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="gradient-hero" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{ maxWidth: 600, margin: '0 auto' }}
                >
                    <h2 style={{ fontSize: '2.25rem', color: 'white', marginBottom: '1rem' }}>
                        Ready for Your Next{' '}
                        <span className="gradient-text">Adventure?</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem', lineHeight: 1.7 }}>
                        Join 50,000+ travelers who trust LuxeStay for their premium hotel bookings.
                    </p>
                    <Link to="/register" className="btn-primary" style={{
                        textDecoration: 'none', padding: '1rem 3rem', fontSize: '1.1rem',
                    }}>
                        Start Exploring — It's Free
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
