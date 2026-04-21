import { Link } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import './HomePage.css';

export default function HomePage() {
  const differentiators = [
    { icon: '🌱', title: 'Start Earlier', text: 'Help children build healthy habits, attitudes, and feelings towards money during their most impressionable years, when influence is strongest.' },
    { icon: '📖', title: 'Unique Curriculum', text: 'Our curriculum goes beyond traditional financial literacy. We emphasize the bigger purpose of money: using it wisely to build self-sufficiency, create opportunity, strengthen freedom and confidence, and secure a better future.', details: ['It\'s Habit-Driven: Because financial success is the result of what you do daily, not just what you know.', 'It\'s Built for Independence: It stresses timeless wealth building principles.', 'It\'s Actually Fun: We trade boring lectures for songs, games, and reading, making complex ideas "stick" through play.'] },
    { icon: '🤝', title: 'Mobilize Older Youth', text: 'Engage teens as mentors and ambassadors, creating a powerful intergenerational learning loop.' },
    { icon: '💡', title: 'Equip Everyday Influencers', text: 'Give parents, caregivers, teachers, and community leaders practical tools and resources.' },
    { icon: '📣', title: 'Raise Awareness', text: 'Bring urgent attention to why earlier financial education matters for families and communities.' },
    { icon: '💬', title: 'Make Money Talks Easier', text: 'Normalize and simplify conversations about money between adults and children.' },
    { icon: '⭐', title: 'Reinforce Participation', text: 'Celebrate effort and engagement to keep families and communities coming back.' },
    { icon: '🚀', title: 'Inspire Dreams', text: 'Connect financial habits to bigger life goals so children see saving as a path to their future.' },
    { icon: '🏛️', title: 'Wealth of Experience', text: 'Built on over 25 years of trusted, hands-on work in children\'s financial education, bringing proven strategies, deep expertise, and real-world credibility to every initiative.' },
  ];

  const steps = [
    { num: '01', title: 'Children Build Habits Early', text: 'Age-appropriate tools help young children practice saving, sharing, and smart choices.', icon: '👶' },
    { num: '02', title: 'Older Youth Teach, Mentor, and Lead', text: 'Teenagers gain workforce skills while mentoring younger children in financial basics.', icon: '🎓' },
    { num: '03', title: 'Parents and Teachers Get Practical Tools', text: 'Parents and educators receive resources that make money conversations easier to start.', icon: '👨‍👩‍👧' },
    { num: '04', title: 'Communities Grow Stronger', text: 'A connected pipeline of opportunity strengthens families and neighborhoods.', icon: '🏘️' },
  ];

  const impactNumbers = [
    { number: '$5M', label: 'Five-Year Vision' },
    { number: '100K', label: 'Books & Curricula Given Away' },
    { number: '10K', label: 'Classrooms & Youth Organizations Reached' },
    { number: '100', label: 'Student Workforce Opportunities' },
  ];

  return (
    <main className="home" id="home-page">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero__bg">
          <img src="/images/hero-banner.png" alt="Diverse children and families learning about financial education in a warm, sunlit community setting" />
          <div className="hero__overlay"></div>
        </div>
        <div className="hero__content container">
          <div className="hero__text">
            <h1 className="hero__title animate-fade-up delay-1">
              Financial education starts too late.<br />
              <span className="hero__title-highlight">We're changing that.</span>
            </h1>
            <p className="hero__subtitle animate-fade-up delay-2">
              Grow Good Daily is building a whole-community model that brings financial education to young people earlier, delivered through the people closest to them: parents, high school and college mentors, schools, and local enterprises all working toward the same goal. Because a lesson lands differently when it comes from someone who looks like you or loves you.
            </p>
            <p className="hero__subtitle animate-fade-up delay-2" style={{ marginTop: 'var(--space-md)' }}>
              We focus our heart and prioritize resources on underserved communities, because where a child starts should never determine where they can go.
            </p>
            <div className="btn-group animate-fade-up delay-3">
              <Link to="/contact" className="btn btn--accent btn--lg" id="hero-cta-primary">
                Join as an Early Supporter
              </Link>
              <Link to="/vision" className="btn btn--white btn--lg" id="hero-cta-secondary">
                Read the Vision →
              </Link>
            </div>
            <p className="hero__credibility animate-fade-up delay-4">
              Bringing 25 years of trusted financial education to the next generation.
            </p>
          </div>
        </div>
        <div className="hero__scroll-indicator">
          <div className="hero__scroll-dot"></div>
        </div>
      </section>

      {/* Big Idea Section */}
      <section className="section big-idea" id="big-idea-section">
        <div className="container">
          <AnimatedSection className="big-idea__content">
            <span className="section__label">The Big Idea</span>
            <h2 className="section__title">Why Grow Good Daily</h2>
            <div className="big-idea__grid">
              <div className="big-idea__text">
                <p className="big-idea__lead">
                  The system is backwards, and it's failing our children.
                </p>
                <p>
                  For thirty years, financial literacy has been centered on high school students, producing negligible impact. Research shows money habits take root by age seven. By the time a student sits down in a high school finance class, their relationship with money is already formed.
                </p>
                <p>
                  Grow Good Daily closes that gap. We bring financial education upstream, to the years when it matters most, so a child's first experience with money is rooted in intention and confidence, not fear or scarcity.
                </p>
                <p className="big-idea__lead" style={{ marginTop: 'var(--space-lg)' }}>
                  We aren't just teaching financial literacy. We're redesigning the starting line.
                </p>
              </div>
              <div className="big-idea__image">
                <img
                  src="/images/early-education.png"
                  alt="Illustration of a young child joyfully learning about saving money, surrounded by growing plants and warmth"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="section section--alt differentiators" id="differentiators-section">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">What Sets Us Apart</span>
            <h2 className="section__title">Our Unique Approach</h2>
            <p className="section__subtitle">
              Nine core principles guide our approach to creating lasting change in financial education.
            </p>
          </AnimatedSection>
          <div className="differentiators__grid">
            {differentiators.map((item, i) => (
              <AnimatedSection key={i} className={`card differentiators__card${item.details ? ' differentiators__card--expanded' : ''}`} delay={i * 0.08}>
                <div className="card__icon">{item.icon}</div>
                <h3 className="card__title">{item.title}</h3>
                <p className="card__text">{item.text}</p>
                {item.details && (
                  <ul className="card__details">
                    {item.details.map((detail, j) => (
                      <li key={j}>{detail}</li>
                    ))}
                  </ul>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How The Model Works */}
      <section className="section model" id="model-section">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">The Model</span>
            <h2 className="section__title">How It Works</h2>
            <p className="section__subtitle">
              Grow Good Daily uses a whole-community intergenerational model, engaging youth, parents, schools, and local enterprises together, so that financial education is reinforced everywhere a young person learns and grows, creating the consistent, long-term conditions real change requires.
            </p>
          </AnimatedSection>
          <div className="model__steps">
            {steps.map((step, i) => (
              <AnimatedSection key={i} className="model__step" delay={i * 0.12}>
                <div className="model__step-icon">{step.icon}</div>
                <div className="model__step-num">{step.num}</div>
                <h3 className="model__step-title">{step.title}</h3>
                <p className="model__step-text">{step.text}</p>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="model__quote text-center" delay={0.45}>
            <blockquote className="model__blockquote">
              <p>"In 26 years of this work, we've learned that when you involve everyone who impacts young children, you impact and change everyone: families, communities, the entire system."</p>
              <cite>- Sam X Renick, Founder: Grow Good Daily, SammyRabbit.com, BedtimeMoneyHabits.com</cite>
            </blockquote>
          </AnimatedSection>
          <AnimatedSection className="text-center" delay={0.5}>
            <Link to="/how-it-works" className="btn btn--primary" id="model-learn-more">
              Learn More About Our Model →
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Now */}
      <section className="section section--warm why-now" id="why-now-section">
        <div className="container">
          <AnimatedSection>
            <div className="why-now__content">
              <div className="why-now__text">
                <span className="section__label">The Urgency</span>
                <h2 className="section__title">Why Now?</h2>
                <div className="why-now__points">
                  <div className="why-now__point">
                    <div className="why-now__point-icon">🧑‍🧒</div>
                    <p>Too many young people enter adulthood without strong money habits and skills</p>
                  </div>
                  <div className="why-now__point">
                    <div className="why-now__point-icon">💵</div>
                    <p>The most impressionable years are often missed, and the youth enter adulthood with unhealthy attitudes and feelings towards money</p>
                  </div>
                  <div className="why-now__point">
                    <div className="why-now__point-icon">🔥</div>
                    <p>Early financial education still lacks enough awareness and urgency</p>
                  </div>
                </div>
              </div>
              <div className="why-now__image">
                <img
                  src="/images/family-learning.png"
                  alt="A family having a warm conversation about money and savings at home together"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Credibility / Proof */}
      <section className="section section--dark credibility" id="credibility-section">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">Proven Foundation</span>
            <h2 className="section__title">Built on 25 Years of Trusted Work</h2>
            <p className="section__subtitle" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Grow Good Daily is not starting from scratch. It builds on a foundation of proven resources, established platforms, and decades of real-world impact.
            </p>
          </AnimatedSection>
          <div className="credibility__grid">
            <AnimatedSection className="credibility__item" delay={0.1}>
              <div className="credibility__icon">🐰</div>
              <h3>SammyRabbit.com</h3>
              <p>An established platform helping children learn about money through stories, songs, and activities</p>
            </AnimatedSection>
            <AnimatedSection className="credibility__item" delay={0.2}>
              <div className="credibility__icon">📚</div>
              <h3>BedtimeMoneyHabits.com</h3>
              <p>Tools and resources that help families make bedtime a moment for building lifelong financial skills</p>
            </AnimatedSection>
            <AnimatedSection className="credibility__item" delay={0.3}>
              <div className="credibility__icon">🎯</div>
              <h3>Existing Content Assets</h3>
              <p>A library of proven educational content ready to be deployed at scale across schools and communities</p>
            </AnimatedSection>
            <AnimatedSection className="credibility__item" delay={0.4}>
              <div className="credibility__icon">⚡</div>
              <h3>Ready to Deploy</h3>
              <p>Ability to quickly deploy proven resources and programming from day one of operations</p>
            </AnimatedSection>
          </div>
          </div>
          <AnimatedSection className="credibility__logos-section text-center" delay={0.5}>
            <h3 className="credibility__logos-title">Leading organizations that have trusted Sam X Renick’s financial education strategies.</h3>
            <div className="credibility__logo-track">
              <div className="credibility__logo-item">
                <img src="https://logo.clearbit.com/defense.gov" alt="Department of Defense" loading="lazy" />
                <span>Department of Defense</span>
              </div>
              <div className="credibility__logo-item">
                <img src="https://logo.clearbit.com/afas.org" alt="Air Force Aid Society" loading="lazy" />
                <span>Air Force</span>
              </div>
              <div className="credibility__logo-item">
                <img src="https://logo.clearbit.com/citi.com" alt="Citibank" loading="lazy" />
                <span>Citibank</span>
              </div>
              <div className="credibility__logo-item">
                <img src="https://logo.clearbit.com/girlscouts.org" alt="Girl Scouts" loading="lazy" />
                <span>Girl Scouts</span>
              </div>
              <div className="credibility__logo-item">
                <img src="https://logo.clearbit.com/fcclainc.org" alt="FCCLA" loading="lazy" />
                <span>FCCLA</span>
              </div>
              <div className="credibility__logo-item">
                <img src="https://logo.clearbit.com/toyota.com" alt="Toyota" loading="lazy" />
                <span>Toyota</span>
              </div>
              <div className="credibility__logo-item">
                <img src="https://logo.clearbit.com/umd.edu" alt="University of Maryland" loading="lazy" />
                <span>UMD</span>
              </div>
              <div className="credibility__logo-item">
                <img src="https://logo.clearbit.com/unitedway.org" alt="United Way" loading="lazy" />
                <span>United Way</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="section impact" id="impact-section">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">The Vision</span>
            <h2 className="section__title">Measurable Impact, Real Goals</h2>
            <p className="section__subtitle">
              Our five-year vision is ambitious, measurable, and grounded in a proven foundation.
            </p>
          </AnimatedSection>
          <div className="impact__grid">
            {impactNumbers.map((item, i) => (
              <AnimatedSection key={i} className="impact__card" delay={i * 0.1}>
                <span className="impact__number">{item.number}</span>
                <span className="impact__label">{item.label}</span>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="impact__extra text-center" delay={0.5}>
            <p>Plus hundreds of thousands reached online through digital content and campaigns</p>
          </AnimatedSection>
        </div>
      </section>
      {/* Promise */}
      <section className="section promise" id="promise-section">
        <div className="container container--narrow text-center">
          <AnimatedSection>
            <div className="promise__content">
              <h2 className="promise__title">
                We want to help redesign the starting line so more children grow up with healthy money habits, stronger confidence, and bigger futures.
              </h2>
              <div className="promise__benefits">
                <span>Less fear around money</span>
                <span>Better family conversations</span>
                <span>More confidence</span>
                <span>Healthier choices</span>
                <span>Stronger futures</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Founding Partner CTA */}
      <section className="section section--dark cta-section" id="founding-cta-section">
        <div className="container container--narrow text-center">
          <AnimatedSection>
            <span className="section__label">Become a Founding Supporter</span>
            <h2 className="section__title">Ways to Support</h2>
            <p className="section__subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Help launch a new model for financial education, stronger families, and youth leadership, building real economic independence for generations to come.
            </p>
            <div className="cta-section__options">
              <Link to="/contact?interest=donate" className="cta-section__option" id="cta-donate">
                <span className="cta-section__option-icon">💰</span>
                <span className="cta-section__option-text">Donate</span>
              </Link>
              <Link to="/contact?interest=sponsor" className="cta-section__option" id="cta-sponsor">
                <span className="cta-section__option-icon">🤝</span>
                <span className="cta-section__option-text">Sponsor</span>
              </Link>
              <Link to="/contact?interest=volunteer" className="cta-section__option" id="cta-volunteer">
                <span className="cta-section__option-icon">🙌</span>
                <span className="cta-section__option-text">Volunteer</span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Transparency Note */}
      <section className="section transparency" id="transparency-section">
        <div className="container container--narrow text-center">
          <AnimatedSection>
            <div className="transparency__content">
              <p className="transparency__text">
                Grow Good Daily is in its earliest stage. The vision is set. Now we're looking to get the right people and enterprises "on the bus" in the "right roles" to help us launch it.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
