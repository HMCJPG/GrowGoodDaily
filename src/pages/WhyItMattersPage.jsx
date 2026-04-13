import { Link } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import './WhyItMattersPage.css';

export default function WhyItMattersPage() {
  const stats = [
    { icon: '📊', stat: '76%', text: 'of Americans live paycheck to paycheck at some point in their lives' },
    { icon: '🎓', stat: '2 in 3', text: 'college students report feeling anxious about their finances' },
    { icon: '👶', stat: 'Age 3-5', text: 'is when children begin forming attitudes and beliefs about money' },
    { icon: '📉', stat: '< 25%', text: 'of young adults feel confident making basic financial decisions' },
  ];

  const impacts = [
    { title: 'Less Fear Around Money', text: 'Children who grow up with financial conversations develop healthier relationships with money and fewer anxieties.', icon: '💚' },
    { title: 'Better Family Conversations', text: 'When families have tools to discuss money openly, the stigma fades and learning becomes natural.', icon: '💬' },
    { title: 'More Confidence', text: 'Young people who learn financial skills early carry that confidence into every decision they make.', icon: '⭐' },
    { title: 'Healthier Choices', text: 'Early exposure to saving, budgeting, and goal-setting leads to smarter financial decisions as adults.', icon: '🎯' },
    { title: 'Stronger Futures', text: 'Financially literate communities see less debt, more savings, and greater economic mobility.', icon: '🚀' },
  ];

  return (
    <main className="why-page" id="why-it-matters-page">
      {/* Page Hero */}
      <section className="page-hero" id="why-hero">
        <div className="page-hero__bg">
          <div className="page-hero__gradient" style={{ background: 'linear-gradient(135deg, #1A2E1C 0%, #2D8A4E 60%, #F9A825 100%)' }}></div>
        </div>
        <div className="container page-hero__content">
          <span className="hero__badge animate-fade-up">The Problem</span>
          <h1 className="page-hero__title animate-fade-up delay-1">
            Why Early Financial Education Matters
          </h1>
          <p className="page-hero__subtitle animate-fade-up delay-2">
            Understanding the urgency: who is affected, what is at stake, and why we cannot afford to wait.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="section" id="why-problem">
        <div className="container">
          <AnimatedSection>
            <div className="why-problem__layout">
              <div className="why-problem__text">
                <span className="section__label">The Challenge</span>
                <h2 className="section__title">Financial Education Arrives Too Late</h2>
                <p className="why-problem__lead">
                  By the time most children receive their first formal financial education, their money habits and attitudes have already started forming.
                </p>
                <p>
                  Research shows that children begin developing financial behaviors as early as age three. Yet the vast majority of financial literacy programs target high school students or adults. This gap means millions of children miss the window when education can be most impactful.
                </p>
                <p>
                  The consequences are real. Young adults enter the workforce without strong money skills, families struggle with conversations about finances, and communities carry the weight of financial instability across generations.
                </p>
              </div>
              <div className="why-problem__image">
                <img src="/images/early-education.png" alt="Illustration representing the importance of starting financial education early with young children" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="section section--dark" id="why-stats">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">The Numbers</span>
            <h2 className="section__title">The Reality We Face</h2>
          </AnimatedSection>
          <div className="why-stats__grid">
            {stats.map((item, i) => (
              <AnimatedSection key={i} className="why-stat" delay={i * 0.1}>
                <span className="why-stat__icon">{item.icon}</span>
                <span className="why-stat__number">{item.stat}</span>
                <p className="why-stat__text">{item.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who is Affected */}
      <section className="section section--alt" id="why-affected">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">Who Is Affected</span>
            <h2 className="section__title">Everyone Feels the Impact</h2>
            <p className="section__subtitle">
              When financial education starts too late, the effects ripple through every part of society.
            </p>
          </AnimatedSection>
          <div className="why-affected__grid">
            <AnimatedSection className="why-affected__card" delay={0.1}>
              <div className="why-affected__icon">👶</div>
              <h3>Children</h3>
              <p>Miss the most impressionable window for building healthy money habits and positive attitudes toward saving.</p>
            </AnimatedSection>
            <AnimatedSection className="why-affected__card" delay={0.2}>
              <div className="why-affected__icon">👨‍👩‍👧‍👦</div>
              <h3>Families</h3>
              <p>Lack the tools and confidence to start conversations about money, perpetuating cycles of financial stress.</p>
            </AnimatedSection>
            <AnimatedSection className="why-affected__card" delay={0.3}>
              <div className="why-affected__icon">🏫</div>
              <h3>Schools</h3>
              <p>Often don't have age-appropriate financial education resources for younger students, leaving a critical gap.</p>
            </AnimatedSection>
            <AnimatedSection className="why-affected__card" delay={0.4}>
              <div className="why-affected__icon">🏘️</div>
              <h3>Communities</h3>
              <p>Bear the economic and social costs when generations grow up without strong financial foundations.</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What changes */}
      <section className="section" id="why-changes">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">What Changes</span>
            <h2 className="section__title">When We Start Earlier, Everything Shifts</h2>
            <p className="section__subtitle">
              Early financial education creates a cascade of benefits that compound over time.
            </p>
          </AnimatedSection>
          <div className="why-impacts__grid">
            {impacts.map((item, i) => (
              <AnimatedSection key={i} className="why-impact" delay={i * 0.08}>
                <div className="why-impact__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--warm text-center" id="why-cta">
        <div className="container container--narrow">
          <AnimatedSection>
            <h2 className="section__title">Help Us Change the Timeline</h2>
            <p className="section__subtitle" style={{ margin: '0 auto var(--space-2xl)' }}>
              Every day we wait is another child who misses the most impactful window for learning healthy money habits.
            </p>
            <div className="btn-group" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn--primary btn--lg" id="why-cta-button">
                Get Involved Today
              </Link>
              <Link to="/how-it-works" className="btn btn--secondary btn--lg" id="why-how-button">
                See Our Solution →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
