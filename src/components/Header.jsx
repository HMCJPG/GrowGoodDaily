import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/vision', label: 'Vision' },
    { path: '/why-it-matters', label: 'Why It Matters' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/founding-partners', label: 'Founding Partners' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`} id="site-header">
      <div className="header__inner container">
        <Link to="/" className="header__logo" id="header-logo" aria-label="Grow Good Daily Home">
          <div className="header__logo-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="url(#logoGrad)" />
              <path d="M20 8C20 8 14 14 14 20C14 23.3 16.7 26 20 26C23.3 26 26 23.3 26 20C26 14 20 8 20 8Z" fill="white" opacity="0.9" />
              <path d="M20 26V33" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M16 30C18 28 22 28 24 30" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
                  <stop stopColor="#2D8A4E" />
                  <stop offset="1" stopColor="#4CAF50" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="header__logo-text">
            <span className="header__logo-grow">Grow</span>
            <span className="header__logo-good">Good</span>
            <span className="header__logo-daily">Daily</span>
          </span>
        </Link>

        <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`} id="main-navigation" aria-label="Main navigation">
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.path} className="header__nav-item">
                <Link
                  to={link.path}
                  className={`header__nav-link ${location.pathname === link.path ? 'header__nav-link--active' : ''}`}
                  id={`nav-link-${link.path.replace('/', '') || 'home'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn--primary header__nav-cta" id="nav-cta-button">
            Get Involved
          </Link>
        </nav>

        <button
          className={`header__hamburger ${isMobileMenuOpen ? 'header__hamburger--open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          id="mobile-menu-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
