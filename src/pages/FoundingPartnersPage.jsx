import { Link } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import './FoundingPartnersPage.css';

export default function FoundingPartnersPage() {
  const tiers = [
    {
      name: 'Visionary Partner',
      amount: '$25,000+',
      icon: '🌟',
      benefits: [
        'Named recognition as a founding visionary partner',
        'Direct involvement in program design and strategy',
        'Quarterly impact reports and updates',
        'Invitation to founding partner advisory events',
        'Featured recognition across all platforms',
      ],
    },
    {
      name: 'Champion Partner',
      amount: '$10,000+',
      icon: '🏆',
      benefits: [
        'Named recognition as a founding champion',
        'Input on program focus areas',
        'Quarterly impact reports',
        'Invitation to founding partner events',
        'Recognition on website and materials',
      ],
    },
    {
      name: 'Builder Partner',
      amount: '$5,000+',
      icon: '🔨',
      benefits: [
        'Named recognition as a founding builder',
        'Regular impact updates',
        'Invitation to launch events',
        'Recognition on website',
        'Early access to resources and content',
      ],
    },
    {
      name: 'Seed Partner',
      amount: '$1,000+',
      icon: '🌱',
      benefits: [
        'Named as a founding seed partner',
        'Regular project updates',
        'Recognition on website',
        'Early access to published materials',
      ],
    },
  ];

  return (
    <main className="partners-page" id="founding-partners-page">
      {/* Page Hero */}
      <section className="page-hero" id="partners-hero">
        <div className="page-hero__bg">
          <div className="page-hero__gradient" style={{ background: 'linear-gradient(135deg, #1A2E1C 0%, #2D8A4E 50%, #F57F17 100%)' }}></div>
        </div>
        <div className="container page-hero__content">
          <span className="hero__badge animate-fade-up">Join Us</span>
          <h1 className="page-hero__title animate-fade-up delay-1">
            Help Launch Grow Good Daily
          </h1>
          <p className="page-hero__subtitle animate-fade-up delay-2">
            We are inviting a select group of founding partners to help shape and launch a new model for earlier financial education.
          </p>
        </div>
      </section>

      {/* The Invitation */}
      <section className="section" id="partners-invitation">
        <div className="container container--narrow">
          <AnimatedSection>
            <div className="partners-intro">
              <span className="section__label">The Invitation</span>
              <h2 className="section__title">Become a Founding Supporter</h2>
              <p className="partners-intro__lead">
                Grow Good Daily is in its formative stage. This is a rare opportunity to be part of something from the very beginning. To help shape a vision, influence its direction, and be recognized for the role you play in launching it.
              </p>
              <p>
                Founding partners will help launch a new model for earlier financial education, stronger families, youth leadership, and broader economic opportunity. Your early support will fuel a $250,000 year-one effort that lays the foundation for a $5 million five-year vision.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Ways to Support */}
      <section className="section section--alt" id="partners-ways">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">Ways to Support</span>
            <h2 className="section__title">Choose How You Want to Help</h2>
            <p className="section__subtitle">
              There are many ways to be part of Grow Good Daily's founding story.
            </p>
          </AnimatedSection>
          <div className="partners-ways__grid">
            <AnimatedSection className="partners-way" delay={0.1}>
              <div className="partners-way__icon">💰</div>
              <h3>Fund</h3>
              <p>Provide financial support to help launch and sustain early programming, content creation, and community outreach.</p>
            </AnimatedSection>
            <AnimatedSection className="partners-way" delay={0.2}>
              <div className="partners-way__icon">🤝</div>
              <h3>Partner</h3>
              <p>Collaborate as an organization, school district, community group, or institution to bring programming to your community.</p>
            </AnimatedSection>
            <AnimatedSection className="partners-way" delay={0.3}>
              <div className="partners-way__icon">💡</div>
              <h3>Advise</h3>
              <p>Share your expertise in education, nonprofit management, youth development, or financial services to help shape strategy.</p>
            </AnimatedSection>
            <AnimatedSection className="partners-way" delay={0.4}>
              <div className="partners-way__icon">📩</div>
              <h3>Stay Connected</h3>
              <p>Join our early supporters list to receive updates, share our vision with your network, and be ready when we launch.</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="section" id="partners-tiers">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">Founding Partner Levels</span>
            <h2 className="section__title">Investment Tiers</h2>
            <p className="section__subtitle">
              Every founding partner receives recognition and access proportional to their investment in the vision.
            </p>
          </AnimatedSection>
          <div className="partners-tiers__grid">
            {tiers.map((tier, i) => (
              <AnimatedSection key={i} className={`partners-tier ${i === 0 ? 'partners-tier--featured' : ''}`} delay={i * 0.1}>
                <div className="partners-tier__icon">{tier.icon}</div>
                <h3 className="partners-tier__name">{tier.name}</h3>
                <span className="partners-tier__amount">{tier.amount}</span>
                <ul className="partners-tier__benefits">
                  {tier.benefits.map((benefit, j) => (
                    <li key={j}>{benefit}</li>
                  ))}
                </ul>
                <Link to="/contact?interest=funding" className="btn btn--primary partners-tier__btn" id={`tier-cta-${i}`}>
                  Get Started
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Year One Goals */}
      <section className="section section--dark" id="partners-goals">
        <div className="container text-center">
          <AnimatedSection>
            <span className="section__label">Year One</span>
            <h2 className="section__title">What Your Support Makes Possible</h2>
          </AnimatedSection>
          <div className="partners-goals__grid">
            <AnimatedSection className="partners-goal" delay={0.1}>
              <span className="partners-goal__num">100,000</span>
              <span className="partners-goal__label">Books and curricula given away</span>
            </AnimatedSection>
            <AnimatedSection className="partners-goal" delay={0.2}>
              <span className="partners-goal__num">10,000</span>
              <span className="partners-goal__label">Classrooms and organizations reached</span>
            </AnimatedSection>
            <AnimatedSection className="partners-goal" delay={0.3}>
              <span className="partners-goal__num">100</span>
              <span className="partners-goal__label">Student workforce opportunities created</span>
            </AnimatedSection>
            <AnimatedSection className="partners-goal" delay={0.4}>
              <span className="partners-goal__num">1000s</span>
              <span className="partners-goal__label">Families empowered nationwide</span>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--warm text-center" id="partners-cta">
        <div className="container container--narrow">
          <AnimatedSection>
            <h2 className="section__title">Ready to Be a Founding Partner?</h2>
            <p className="section__subtitle" style={{ margin: '0 auto var(--space-2xl)' }}>
              Reach out today. Let's start a conversation about how you can be part of the founding story.
            </p>
            <Link to="/contact" className="btn btn--primary btn--lg" id="partners-contact-cta">
              Start the Conversation →
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
