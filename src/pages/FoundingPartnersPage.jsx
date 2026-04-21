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
          <span className="hero__badge animate-fade-up">Ways to Support</span>
          <h1 className="page-hero__title animate-fade-up delay-1">
            Support the Mission. Grow the Impact.
          </h1>
          <p className="page-hero__subtitle animate-fade-up delay-2">
            Whether you give, sponsor, partner, volunteer, or simply spread the word, every act of support helps children build healthier financial futures.
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

      {/* Donate */}
      <section className="section donate-section" id="donate-section">
        <div className="container container--narrow text-center">
          <AnimatedSection>
            <span className="section__label">Donate</span>
            <h2 className="section__title">Support the Vision. Advance the Mission.</h2>
            <p className="donate-section__lead">
              Your gift helps us place books, songs, and online learning tools into the hands and homes of children, families, schools, and communities, with a special focus on underserved areas. Together, we can help children build healthy money habits early, inspire bigger dreams, and create stronger futures.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <h3 className="donate-section__subtitle">Give Any Amount</h3>
            <div className="donate-section__amounts">
              {['$5', '$10', '$25', '$100', '$250'].map((amt, i) => (
                <Link key={i} to={`/contact?interest=donate&amount=${amt}`} className="donate-section__amount-btn" id={`donate-amt-${i}`}>
                  {amt}
                </Link>
              ))}
              <Link to="/contact?interest=donate&amount=other" className="donate-section__amount-btn donate-section__amount-btn--other" id="donate-amt-other">
                Other
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Sponsorship Opportunities */}
      <section className="section section--alt sponsorship-section" id="sponsorship-section">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">Sponsorship Opportunities</span>
            <h2 className="section__title">Invest in Impact at Scale</h2>
          </AnimatedSection>

          {/* A. Schools */}
          <AnimatedSection delay={0.1}>
            <div className="sponsorship-block" id="sponsor-schools">
              <div className="sponsorship-block__header">
                <span className="sponsorship-block__letter">A</span>
                <h3>Support Schools and Afterschool Programs</h3>
              </div>
              <div className="sponsorship-block__cards">
                <div className="sponsorship-card">
                  <span className="sponsorship-card__price">$2,500</span>
                  <h4>Support One School. Strengthen 250 Futures.</h4>
                  <p>
                    Your sponsorship helps bring meaningful financial education to one school by providing 250 students, families, and teachers with trusted, age-appropriate resources for use at school and at home.
                  </p>
                  <p className="sponsorship-card__detail">Included in this sponsorship:</p>
                  <ul>
                    <li>125 copies of <em>It's a Habit, Sammy Rabbit!</em> Story Activity Book (Grades K–2)</li>
                    <li>125 copies of <em>Sammy's Big Dream!</em> Story Activity Book (Grades 2–5)</li>
                    <li>125 one-year Bedtime Money Habits memberships, including Parent and Teacher Guides</li>
                    <li>125 one-year Sammy Rabbit Money School memberships (Grades 2–5)</li>
                    <li>One-year school-wide license to standards-based financial education curriculum</li>
                  </ul>
                </div>
                <div className="sponsorship-card">
                  <span className="sponsorship-card__price">$5,000</span>
                  <h4>Support Two Schools. Strengthen 500 Futures.</h4>
                  <p>Help expand access to high-quality financial education resources for 500 students, families, and teachers.</p>
                </div>
                <div className="sponsorship-card">
                  <span className="sponsorship-card__price">$10,000</span>
                  <h4>Support Four Schools. Strengthen 1,000 Futures.</h4>
                  <p>Make an even greater impact by helping us reach 1,000 students, families, and teachers with resources that build healthy habits and brighter futures.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* B. Youth Workforce */}
          <AnimatedSection delay={0.2}>
            <div className="sponsorship-block" id="sponsor-youth">
              <div className="sponsorship-block__header">
                <span className="sponsorship-block__letter">B</span>
                <h3>Youth Workforce Pipeline and Global Network</h3>
              </div>
              <div className="sponsorship-card sponsorship-card--wide">
                <span className="sponsorship-card__price">$15,000</span>
                <h4>Support One Paid Internship and Four Elementary School Financial Education Programs</h4>
                <p>Your sponsorship supports one paid high school or college internship and helps deliver financial education experiences to four elementary school programs.</p>
                <p className="sponsorship-card__detail">This opportunity helps us:</p>
                <ul>
                  <li>Create a 10- to 20-hour-per-week paid position for a young leader</li>
                  <li>Prepare and empower youth to teach and lead financial education experiences</li>
                  <li>Expand the reach of our programs in elementary schools and local communities</li>
                  <li>Build a stronger youth workforce pipeline grounded in leadership, service, and impact</li>
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* C. Dream Big Read */}
          <AnimatedSection delay={0.3}>
            <div className="sponsorship-block" id="sponsor-books">
              <div className="sponsorship-block__header">
                <span className="sponsorship-block__letter">C</span>
                <h3>Signature Initiative: Annual Dream Big Read and Book Giveaway Day</h3>
              </div>
              <p className="sponsorship-block__intro">Help us put inspiring books directly into the hands of children and families.</p>
              <div className="sponsorship-block__cards sponsorship-block__cards--compact">
                {[
                  { books: '100 books', price: '$500' },
                  { books: '250 books', price: '$1,000' },
                  { books: '500 books', price: '$1,500' },
                  { books: '1,000 books', price: '$2,500' },
                ].map((item, i) => (
                  <div className="sponsorship-card sponsorship-card--mini" key={i}>
                    <span className="sponsorship-card__price">{item.price}</span>
                    <span className="sponsorship-card__books">{item.books}</span>
                  </div>
                ))}
                <Link to="/contact?interest=sponsor-books" className="sponsorship-card sponsorship-card--mini sponsorship-card--mini-other" id="sponsor-books-other">
                  <span className="sponsorship-card__books">Other</span>
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* D. Custom */}
          <AnimatedSection delay={0.4}>
            <div className="sponsorship-block sponsorship-block--custom" id="sponsor-custom">
              <div className="sponsorship-block__header">
                <span className="sponsorship-block__letter">D</span>
                <h3>Custom Sponsorship</h3>
              </div>
              <p>Interested in creating a customized sponsorship? Contact us to design an opportunity that aligns with your goals and the impact you want to make.</p>
              <Link to="/contact?interest=custom-sponsorship" className="btn btn--primary" id="custom-sponsor-cta">
                Contact Us →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="section volunteer-section" id="volunteer-section">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">Volunteer Opportunities</span>
            <h2 className="section__title">Lend Your Time and Talents</h2>
            <p className="section__subtitle">
              Join us in helping children build healthy money habits, dream bigger, and create brighter futures.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="volunteer-content">
              <p className="volunteer-content__lead">
                We welcome volunteers who want to make a meaningful difference in their communities and beyond. Whether you are a student, professional, educator, retiree, or community supporter, there are many ways to contribute your time, talents, and passion to our mission.
              </p>
              <h3 className="volunteer-content__heading">Volunteer opportunities may include:</h3>
              <div className="volunteer-grid">
                {[
                  { icon: '🏫', text: 'Supporting school and community outreach' },
                  { icon: '📚', text: 'Assisting with book giveaways and special events' },
                  { icon: '📋', text: 'Helping with program coordination and administrative support' },
                  { icon: '🎨', text: 'Contributing skills in writing, design, social media, marketing, or research' },
                  { icon: '🤝', text: 'Serving as a mentor, ambassador, or community advocate' },
                  { icon: '🌐', text: 'Expanding awareness through local networks and online communities' },
                ].map((item, i) => (
                  <div className="volunteer-item" key={i}>
                    <span className="volunteer-item__icon">{item.icon}</span>
                    <span className="volunteer-item__text">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="volunteer-cta text-center">
                <p className="volunteer-cta__prompt">Interested in volunteering?</p>
                <Link to="/contact?interest=volunteer" className="btn btn--primary" id="volunteer-contact-cta">
                  Contact Us to Learn More →
                </Link>
              </div>
            </div>
          </AnimatedSection>
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
