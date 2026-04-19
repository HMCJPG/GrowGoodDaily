import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" id="footer-logo">
            <img src="/images/GrowGoodDaily.logo2C.png" alt="Grow Good Daily" className="footer__logo-img" style={{ maxHeight: '40px', objectFit: 'contain' }} />
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
              <li><Link to="/founding-partners" id="footer-link-partners">Ways to Support</Link></li>
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
