import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) { setError('Please fill in all fields'); return; }
        setLoading(true);
        setTimeout(() => {
            login(email, password);
            setLoading(false);
            navigate('/dashboard');
        }, 800);
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f52 50%, #1a365d 100%)',
            padding: '2rem',
        }}>
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="card"
                style={{ maxWidth: 440, width: '100%', padding: '2.5rem' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>✦</span>
                        <span style={{
                            fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800,
                            background: 'linear-gradient(135deg, #14b8a6, #0a0e27)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        }}>LuxeStay</span>
                    </Link>
                    <h1 style={{ fontSize: '1.5rem', color: 'var(--color-navy-900)', marginBottom: '0.375rem' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--color-slate-400)', fontSize: '0.9rem' }}>Sign in to your account</p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(244,63,94,0.08)', color: '#f43f5e',
                        padding: '0.75rem 1rem', borderRadius: 10, marginBottom: '1rem',
                        fontSize: '0.85rem', fontWeight: 500,
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={labelStyle}>Email</label>
                        <input
                            className="input-field"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@email.com"
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={labelStyle}>Password</label>
                        <input
                            className="input-field"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                        style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? '⏳ Signing in...' : 'Sign In'}
                    </motion.button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--color-slate-400)', fontSize: '0.9rem' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#14b8a6', fontWeight: 600, textDecoration: 'none' }}>Create one</Link>
                </p>

                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--color-slate-50)', borderRadius: 12, fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>
                    <strong style={{ color: 'var(--color-slate-600)' }}>Demo:</strong> Use any email/password to login. Use an email with "admin" for admin access.
                </div>
            </motion.div>
        </div>
    );
}

const labelStyle = {
    display: 'block', fontSize: '0.8rem', fontWeight: 600,
    color: 'var(--color-slate-600)', marginBottom: '0.375rem',
};
