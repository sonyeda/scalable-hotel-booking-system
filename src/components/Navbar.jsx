import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 ${isHome ? 'glass' : 'glass-light'}`}
            style={{
                padding: '1rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.75rem' }}>✦</span>
                <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    background: isHome
                        ? 'linear-gradient(135deg, #2dd4bf, #fde047)'
                        : 'linear-gradient(135deg, #14b8a6, #0a0e27)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                    LuxeStay
                </span>
            </Link>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <NavLink to="/" label="Home" isHome={isHome} active={location.pathname === '/'} />
                <NavLink to="/search" label="Hotels" isHome={isHome} active={location.pathname === '/search'} />

                {user ? (
                    <>
                        <NavLink to="/dashboard" label="My Trips" isHome={isHome} active={location.pathname === '/dashboard'} />
                        {user.isAdmin && <NavLink to="/admin" label="Admin" isHome={isHome} active={location.pathname === '/admin'} />}

                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    background: 'linear-gradient(135deg, #14b8a6, #2dd4bf)',
                                    color: 'white', padding: '0.5rem 1rem',
                                    borderRadius: '999px', border: 'none', cursor: 'pointer',
                                    fontWeight: 600, fontSize: '0.875rem', fontFamily: 'var(--font-body)',
                                }}
                            >
                                <span style={{
                                    width: 28, height: 28, borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.8rem', fontWeight: 700,
                                }}>
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                                {user.name}
                            </button>

                            <AnimatePresence>
                                {menuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        style={{
                                            position: 'absolute', top: '110%', right: 0,
                                            background: 'white', borderRadius: 12, padding: '0.5rem',
                                            boxShadow: 'var(--shadow-card-hover)', minWidth: 180,
                                        }}
                                    >
                                        <DropItem onClick={() => { setMenuOpen(false); navigate('/dashboard'); }}>My Bookings</DropItem>
                                        <DropItem onClick={() => { setMenuOpen(false); logout(); navigate('/'); }}>Logout</DropItem>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{
                            textDecoration: 'none', color: isHome ? 'white' : 'var(--color-slate-700)',
                            fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.2s',
                        }}>
                            Sign In
                        </Link>
                        <Link to="/register" className="btn-primary" style={{
                            textDecoration: 'none', padding: '0.5rem 1.25rem',
                            fontSize: '0.9rem', borderRadius: '999px',
                        }}>
                            Get Started
                        </Link>
                    </>
                )}
            </div>
        </motion.nav>
    );
}

function NavLink({ to, label, isHome, active }) {
    return (
        <Link
            to={to}
            style={{
                textDecoration: 'none',
                color: active
                    ? (isHome ? '#2dd4bf' : '#14b8a6')
                    : (isHome ? 'rgba(255,255,255,0.8)' : 'var(--color-slate-600)'),
                fontWeight: active ? 600 : 500,
                fontSize: '0.95rem',
                transition: 'color 0.2s',
                position: 'relative',
            }}
        >
            {label}
            {active && (
                <motion.div
                    layoutId="nav-indicator"
                    style={{
                        position: 'absolute', bottom: -4, left: 0, right: 0, height: 2,
                        background: 'linear-gradient(135deg, #14b8a6, #2dd4bf)',
                        borderRadius: 2,
                    }}
                />
            )}
        </Link>
    );
}

function DropItem({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'block', width: '100%', padding: '0.625rem 1rem',
                background: 'none', border: 'none', textAlign: 'left',
                cursor: 'pointer', borderRadius: 8, fontSize: '0.9rem',
                color: 'var(--color-slate-700)', fontFamily: 'var(--font-body)',
                transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.background = 'var(--color-slate-100)'}
            onMouseLeave={(e) => e.target.style.background = 'none'}
        >
            {children}
        </button>
    );
}
