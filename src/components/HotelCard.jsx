import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HotelCard({ hotel, index = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="card"
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            {/* Image */}
            <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    loading="lazy"
                    style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                {/* Rating Badge */}
                <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                    color: 'white', padding: '0.35rem 0.75rem',
                    borderRadius: 999, fontSize: '0.8rem', fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: 4,
                }}>
                    ⭐ {hotel.rating}
                </div>
                {/* City Badge */}
                <div style={{
                    position: 'absolute', bottom: 12, left: 12,
                    background: 'linear-gradient(135deg, #14b8a6, #2dd4bf)',
                    color: 'white', padding: '0.3rem 0.8rem',
                    borderRadius: 999, fontSize: '0.75rem', fontWeight: 600,
                }}>
                    📍 {hotel.city}
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--color-slate-900)' }}>
                    {hotel.name}
                </h3>
                <p style={{
                    fontSize: '0.85rem', color: 'var(--color-slate-500)',
                    lineHeight: 1.5, marginBottom: '1rem',
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    flex: 1,
                }}>
                    {hotel.description}
                </p>

                {/* Amenities Preview */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {hotel.amenities.slice(0, 4).map(a => (
                        <span key={a} className="badge badge-teal">{a}</span>
                    ))}
                    {hotel.amenities.length > 4 && (
                        <span className="badge" style={{ background: 'var(--color-slate-100)', color: 'var(--color-slate-500)' }}>
                            +{hotel.amenities.length - 4}
                        </span>
                    )}
                </div>

                {/* Price & CTA */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--color-slate-100)',
                }}>
                    <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>Starting from</span>
                        <div>
                            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy-900)' }}>
                                ₹{hotel.priceStart.toLocaleString()}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}> /night</span>
                        </div>
                    </div>
                    <Link to={`/hotel/${hotel.id}`} className="btn-primary" style={{
                        textDecoration: 'none', padding: '0.5rem 1.25rem',
                        fontSize: '0.85rem', borderRadius: 999,
                    }}>
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
