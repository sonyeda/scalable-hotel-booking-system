import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer style={{
            background: 'var(--color-navy-900)',
            color: 'rgba(255,255,255,0.7)',
            padding: '4rem 2rem 2rem',
            marginTop: '4rem',
        }}>
            <div className="page-container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem',
                }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>✦</span>
                            <span className="gradient-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800 }}>
                                LuxeStay
                            </span>
                        </div>
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                            Premium hotel booking platform. Discover extraordinary stays across India.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: 'white', fontSize: '0.95rem', marginBottom: '1rem' }}>Quick Links</h4>
                        <FooterLink to="/search">Find Hotels</FooterLink>
                        <FooterLink to="/search?city=Goa">Goa Hotels</FooterLink>
                        <FooterLink to="/search?city=Mumbai">Mumbai Hotels</FooterLink>
                        <FooterLink to="/search?city=Udaipur">Udaipur Hotels</FooterLink>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 style={{ color: 'white', fontSize: '0.95rem', marginBottom: '1rem' }}>Company</h4>
                        <FooterLink to="/">About Us</FooterLink>
                        <FooterLink to="/">Careers</FooterLink>
                        <FooterLink to="/">Press</FooterLink>
                        <FooterLink to="/">Blog</FooterLink>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 style={{ color: 'white', fontSize: '0.95rem', marginBottom: '1rem' }}>Support</h4>
                        <FooterLink to="/">Help Center</FooterLink>
                        <FooterLink to="/">Cancellation Policy</FooterLink>
                        <FooterLink to="/">Privacy Policy</FooterLink>
                        <FooterLink to="/">Terms of Service</FooterLink>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    fontSize: '0.8rem',
                }}>
                    <span>© 2026 LuxeStay. All rights reserved.</span>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <SocialIcon>𝕏</SocialIcon>
                        <SocialIcon>in</SocialIcon>
                        <SocialIcon>ig</SocialIcon>
                        <SocialIcon>fb</SocialIcon>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ to, children }) {
    return (
        <Link to={to} style={{
            display: 'block', textDecoration: 'none', color: 'rgba(255,255,255,0.6)',
            fontSize: '0.875rem', marginBottom: '0.5rem', transition: 'color 0.2s',
        }}
            onMouseEnter={(e) => e.target.style.color = '#2dd4bf'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
        >
            {children}
        </Link>
    );
}

function SocialIcon({ children }) {
    return (
        <span style={{
            width: 32, height: 32, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
            transition: 'all 0.2s',
        }}
            onMouseEnter={(e) => { e.target.style.borderColor = '#2dd4bf'; e.target.style.color = '#2dd4bf'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.color = 'inherit'; }}
        >
            {children}
        </span>
    );
}
