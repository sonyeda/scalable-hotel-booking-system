import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SearchBar({ variant = 'hero', initialValues = {} }) {
    const navigate = useNavigate();
    const [city, setCity] = useState(initialValues.city || '');
    const [checkIn, setCheckIn] = useState(initialValues.checkIn || '');
    const [checkOut, setCheckOut] = useState(initialValues.checkOut || '');
    const [guests, setGuests] = useState(initialValues.guests || '');

    const today = new Date().toISOString().split('T')[0];

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (city) params.set('city', city);
        if (checkIn) params.set('checkIn', checkIn);
        if (checkOut) params.set('checkOut', checkOut);
        if (guests) params.set('guests', guests);
        navigate(`/search?${params.toString()}`);
    };

    const isHero = variant === 'hero';

    return (
        <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                alignItems: 'flex-end',
                background: isHero ? 'rgba(255,255,255,0.1)' : 'white',
                backdropFilter: isHero ? 'blur(16px)' : 'none',
                padding: isHero ? '1.5rem' : '1rem',
                borderRadius: 20,
                border: isHero ? '1px solid rgba(255,255,255,0.15)' : '2px solid var(--color-slate-200)',
                boxShadow: isHero ? 'var(--shadow-glass)' : 'var(--shadow-card)',
                maxWidth: isHero ? 900 : '100%',
                margin: isHero ? '0 auto' : 0,
            }}
        >
            <SearchField label="Where" isHero={isHero}>
                <input
                    type="text"
                    placeholder="City or destination"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={inputStyle(isHero)}
                />
            </SearchField>

            <SearchField label="Check In" isHero={isHero}>
                <input
                    type="date"
                    value={checkIn}
                    min={today}
                    onChange={(e) => setCheckIn(e.target.value)}
                    style={inputStyle(isHero)}
                />
            </SearchField>

            <SearchField label="Check Out" isHero={isHero}>
                <input
                    type="date"
                    value={checkOut}
                    min={checkIn || today}
                    onChange={(e) => setCheckOut(e.target.value)}
                    style={inputStyle(isHero)}
                />
            </SearchField>

            <SearchField label="Guests" isHero={isHero}>
                <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    style={inputStyle(isHero)}
                >
                    <option value="">Any</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4+ Guests</option>
                </select>
            </SearchField>

            <motion.button
                type="submit"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    padding: '0.875rem 2.5rem',
                    fontSize: '1rem',
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    minWidth: 140,
                    justifyContent: 'center',
                }}
            >
                🔍 Search
            </motion.button>
        </motion.form>
    );
}

function SearchField({ label, isHero, children }) {
    return (
        <div style={{ flex: '1 1 180px', minWidth: 150 }}>
            <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                marginBottom: '0.375rem',
                color: isHero ? 'rgba(255,255,255,0.7)' : 'var(--color-slate-500)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
            }}>
                {label}
            </label>
            {children}
        </div>
    );
}

function inputStyle(isHero) {
    return {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: 12,
        border: isHero ? '1px solid rgba(255,255,255,0.2)' : '2px solid var(--color-slate-200)',
        background: isHero ? 'rgba(255,255,255,0.08)' : 'white',
        color: isHero ? 'white' : 'var(--color-slate-800)',
        fontSize: '0.9rem',
        fontFamily: 'var(--font-body)',
        outline: 'none',
        transition: 'all 0.2s',
    };
}
