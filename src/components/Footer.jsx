import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" id="footer-logo">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
              <circle cx="20" cy="20" r="20" fill="url(#footerLogoGrad)" />
              <path d="M20 8C20 8 14 14 14 20C14 23.3 16.7 26 20 26C23.3 26 26 23.3 26 20C26 14 20 8 20 8Z" fill="white" opacity="0.9" />
              <path d="M20 26V33" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M16 30C18 28 22 28 24 30" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
              <defs>
                <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="40" y2="40">
                  <stop stopColor="#4CAF50" />
                  <stop offset="1" stopColor="#81C784" />
                </linearGradient>
              </defs>
            </svg>
            <span className="footer__logo-text">Grow Good Daily</span>
          </Link>
          <p className="footer__tagline">
            Helping children, families, and communities build healthy money habits, stronger confidence, and bigger futures.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4 className="footer__col-title">Explore</h4>
            <ul>
              <li><Link to="/vision" id="footer-link-vision">Our Vision</Link></li>
              <li><Link to="/why-it-matters" id="footer-link-why">Why It Matters</Link></li>
              <li><Link to="/how-it-works" id="footer-link-how">How It Works</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Get Involved</h4>
            <ul>
              <li><Link to="/founding-partners" id="footer-link-partners">Founding Partners</Link></li>
              <li><Link to="/about" id="footer-link-about">About the Founder</Link></li>
              <li><Link to="/contact" id="footer-link-contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Resources</h4>
            <ul>
              <li><a href="https://sammyrabbit.com" target="_blank" rel="noopener noreferrer" id="footer-link-sammy">SammyRabbit.com</a></li>
              <li><a href="https://bedtimemoneyhabits.com" target="_blank" rel="noopener noreferrer" id="footer-link-bedtime">BedtimeMoneyHabits.com</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>&copy; {new Date().getFullYear()} Grow Good Daily. All rights reserved.</p>
        <p className="footer__note">
          Grow Good Daily is in its formative stage. Currently sharing the vision and building early relationships.
        </p>
      </div>
    </footer>
  );
}
