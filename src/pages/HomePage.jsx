import { Link } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import './HomePage.css';

export default function HomePage() {
  const differentiators = [
    { icon: '🌱', title: 'Start Earlier', text: 'Help children build healthy habits, attitudes, and feelings towards money during their most impressionable years, when influence is strongest.' },
    { icon: '🤝', title: 'Mobilize Older Youth', text: 'Engage teens as mentors and ambassadors, creating a powerful intergenerational learning loop.' },
    { icon: '💡', title: 'Equip Everyday Influencers', text: 'Give parents, caregivers, teachers, and community leaders practical tools and resources.' },
    { icon: '📣', title: 'Raise Awareness', text: 'Bring urgent attention to why earlier financial education matters for families and communities.' },
    { icon: '💬', title: 'Make Money Talks Easier', text: 'Normalize and simplify conversations about money between adults and children.' },
    { icon: '⭐', title: 'Reinforce Participation', text: 'Celebrate effort and engagement to keep families and communities coming back.' },
    { icon: '🚀', title: 'Inspire Dreams', text: 'Connect financial habits to bigger life goals so children see saving as a path to their future.' },
    { icon: '🏛️', title: 'Wealth of Experience', text: 'Built on over 25 years of trusted, hands-on work in children\'s financial education — bringing proven strategies, deep expertise, and real-world credibility to every initiative.' },
    { icon: '📈', title: 'Consistent Daily Growth', text: 'Good financial formation isn\'t built overnight. Small, intentional daily habits — saving a little, talking about money openly, making thoughtful choices — compound into lifelong economic strength and freedom.' },
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
              Grow Good Daily is building a whole-community model that brings financial education to young people earlier — delivered through the people closest to them: parents, high school and college mentors, schools, and local enterprises all working toward the same goal. Because a lesson lands differently when it comes from someone who looks like you or loves you.
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
                  The system is backwards — and it's failing our children.
                </p>
                <p>
                  For thirty years, financial literacy has been centered on high school students — producing negligible impact. Research shows money habits take root by age seven. By the time a student sits down in a high school finance class, their relationship with money is already formed.
                </p>
                <p>
                  Grow Good Daily closes that gap. We bring financial education upstream — to the years when it matters most — so a child's first experience with money is rooted in intention and confidence, not fear or scarcity.
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
              <AnimatedSection key={i} className="card differentiators__card" delay={i * 0.08}>
                <div className="card__icon">{item.icon}</div>
                <h3 className="card__title">{item.title}</h3>
                <p className="card__text">{item.text}</p>
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
              Grow Good Daily uses a whole-community intergenerational model — engaging youth, parents, schools, and local enterprises together — so that financial education is reinforced everywhere a young person learns and grows, creating the consistent, long-term conditions real change requires.
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
              <p>"In 26 years of this work, we've learned that when you involve everyone who impacts young children, you impact and change everyone — families, communities, the entire system."</p>
              <cite>— Sam X Renick, Founder: Grow Good Daily, SammyRabbit.com, BedtimeMoneyHabits.com</cite>
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
      {/* 5-Year Plan Timeline */}
      <section className="section section--dark fiveyr" id="fiveyr-section">
        <div className="container text-center">
          <AnimatedSection>
            <span className="section__label">The Roadmap</span>
            <h2 className="section__title">Grow Good Daily — 5-Year Plan</h2>
            <p className="fiveyr__tagline">
              Redesigning the starting line for economic opportunity &nbsp;·&nbsp; Total vision: <strong>$5,000,000</strong>
            </p>
          </AnimatedSection>
        </div>
        <AnimatedSection delay={0.15}>
          <div className="fiveyr__track-wrapper">
            <div className="fiveyr__track" id="fiveyr-track">
              {/* Year 1 */}
              <div className="fiveyr__card fiveyr__card--y1">
                <div className="fiveyr__card-top">
                  <span className="fiveyr__year">Year 1</span>
                  <span className="fiveyr__theme-badge">Foundation</span>
                </div>
                <h3 className="fiveyr__subtitle">Nonprofit formation &amp; operational readiness</h3>
                <ul className="fiveyr__list">
                  <li>Complete nonprofit formation and legal structure</li>
                  <li>Establish operating infrastructure and leadership</li>
                  <li>Deploy proven Sammy Rabbit content and brand assets</li>
                  <li>Develop Year 2 launch strategy for book giveaway and youth network</li>
                  <li>Begin funder outreach and founding partner cultivation</li>
                  <li>Launch initial awareness and social presence</li>
                </ul>
                <div className="fiveyr__budget">
                  <span className="fiveyr__budget-label">Annual budget</span>
                  <span className="fiveyr__budget-amount">$250,000</span>
                </div>
              </div>

              {/* Year 2 */}
              <div className="fiveyr__card fiveyr__card--y2">
                <div className="fiveyr__card-top">
                  <span className="fiveyr__year">Year 2</span>
                  <span className="fiveyr__theme-badge fiveyr__theme-badge--launch">Launch</span>
                </div>
                <h3 className="fiveyr__subtitle">National book giveaway &amp; youth workforce launch</h3>
                <ul className="fiveyr__list">
                  <li>Launch 100,000-book and curriculum giveaway to low-to-moderate-income families</li>
                  <li>Activate youth workforce pipeline: paid internships, part-time roles, ambassador program</li>
                  <li>Onboard first cohort of school and community partners</li>
                  <li>Deploy digital learning tools and platforms</li>
                  <li>Begin community pilot programs in target markets</li>
                  <li>Measure and report early reach and engagement data</li>
                </ul>
                <div className="fiveyr__budget">
                  <span className="fiveyr__budget-label">Annual budget</span>
                  <span className="fiveyr__budget-amount">$750,000</span>
                </div>
              </div>

              {/* Year 3 */}
              <div className="fiveyr__card fiveyr__card--y3">
                <div className="fiveyr__card-top">
                  <span className="fiveyr__year">Year 3</span>
                  <span className="fiveyr__theme-badge fiveyr__theme-badge--scale">Scale</span>
                </div>
                <h3 className="fiveyr__subtitle">Training, evaluation &amp; community expansion</h3>
                <ul className="fiveyr__list">
                  <li>Expand to 10,000+ classrooms, afterschool programs, and youth orgs</li>
                  <li>Launch educator and adult facilitator training programs</li>
                  <li>Introduce formal program evaluation and impact reporting</li>
                  <li>Deepen youth network with structured roles and mentorship tracks</li>
                  <li>Broaden awareness campaigns reaching millions through media and partnerships</li>
                  <li>Begin building toward revenue-generating strategies</li>
                </ul>
                <div className="fiveyr__budget">
                  <span className="fiveyr__budget-label">Annual budget</span>
                  <span className="fiveyr__budget-amount">$1,000,000</span>
                </div>
              </div>

              {/* Year 4 */}
              <div className="fiveyr__card fiveyr__card--y4">
                <div className="fiveyr__card-top">
                  <span className="fiveyr__year">Year 4</span>
                  <span className="fiveyr__theme-badge fiveyr__theme-badge--deepen">Deepen</span>
                </div>
                <h3 className="fiveyr__subtitle">Technology, equity reach &amp; sustainability</h3>
                <ul className="fiveyr__list">
                  <li>Scale digital platform to reach hundreds of thousands online</li>
                  <li>Expand into underserved communities with targeted equity focus</li>
                  <li>Strengthen mission-aligned revenue streams to reduce philanthropy dependence</li>
                  <li>Grow paid youth internship and job pathways — target 100+ students</li>
                  <li>Deepen family engagement tools and parent confidence resources</li>
                  <li>Publish multi-year impact report and third-party evaluation findings</li>
                </ul>
                <div className="fiveyr__budget">
                  <span className="fiveyr__budget-label">Annual budget</span>
                  <span className="fiveyr__budget-amount">$1,250,000</span>
                </div>
              </div>

              {/* Year 5 */}
              <div className="fiveyr__card fiveyr__card--y5">
                <div className="fiveyr__card-top">
                  <span className="fiveyr__year">Year 5</span>
                  <span className="fiveyr__theme-badge fiveyr__theme-badge--movement">Movement</span>
                </div>
                <h3 className="fiveyr__subtitle">National movement &amp; long-term self-sufficiency</h3>
                <ul className="fiveyr__list">
                  <li>Achieve millions reached directly and indirectly with early financial literacy messaging</li>
                  <li>Operate a self-sustaining national youth network and ambassador program</li>
                  <li>Secure long-term institutional partnerships with school districts and nonprofits</li>
                  <li>Normalize early money conversations as a mainstream cultural expectation</li>
                  <li>Transition toward majority earned revenue and reduced grant dependence</li>
                  <li>Establish Grow Good Daily as the leading national early financial education movement</li>
                </ul>
                <div className="fiveyr__budget">
                  <span className="fiveyr__budget-label">Annual budget</span>
                  <span className="fiveyr__budget-amount">$1,750,000</span>
                </div>
              </div>

              {/* Total Card */}
              <div className="fiveyr__card fiveyr__card--total">
                <div className="fiveyr__total-inner">
                  <span className="fiveyr__total-label">5-year total investment goal</span>
                  <span className="fiveyr__total-amount">$5,000,000</span>
                </div>
              </div>
            </div>
          </div>
          <div className="fiveyr__scroll-hint container text-center">
            <span>← Scroll to explore the full roadmap →</span>
          </div>
        </AnimatedSection>
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
            <span className="section__label">Get Involved</span>
            <h2 className="section__title">Become a Founding Supporter</h2>
            <p className="section__subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Help launch a new model for financial education, stronger families, and youth leadership — building real economic independence for generations to come.
            </p>
            <div className="cta-section__options">
              <Link to="/contact?interest=funding" className="cta-section__option" id="cta-fund">
                <span className="cta-section__option-icon">💰</span>
                <span className="cta-section__option-text">Fund</span>
              </Link>
              <Link to="/contact?interest=partnership" className="cta-section__option" id="cta-partner">
                <span className="cta-section__option-icon">🤝</span>
                <span className="cta-section__option-text">Partner</span>
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
