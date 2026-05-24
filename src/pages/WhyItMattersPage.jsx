import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import SEOHead from '../components/SEOHead';
import './WhyItMattersPage.css';

export default function WhyItMattersPage() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const stats = [
    { icon: '📊', stat: '76%', text: 'of Americans live paycheck to paycheck at some point in their lives' },
    { icon: '🎓', stat: '2 in 3', text: 'college students report feeling anxious about their finances' },
    { icon: '👶', stat: 'Age 3-5', text: 'is when children begin forming attitudes and beliefs about money' },
    { icon: '📉', stat: '< 25%', text: 'of young adults feel confident making basic financial decisions' },
  ];

  const accordionReasons = [
    {
      title: 'The Cost of Waiting Is Too High',
      icon: '💸',
      content: 'Every year we delay reaching children with financial education, another cohort of young people enters adulthood without the tools to manage money well. The result? Higher rates of consumer debt, lower savings, and families trapped in cycles of financial stress that stretch across generations. Research from the University of Cambridge shows money habits are largely set by age seven — meaning every year of delay is a year of missed opportunity.',
    },
    {
      title: 'Most Financial Literacy Programs Miss the Mark',
      icon: '🎯',
      content: 'The vast majority of financial education initiatives are aimed at high school students or adults. By that point, attitudes toward money, spending patterns, and financial anxiety have already taken root. Studies show that high school financial literacy mandates alone produce minimal long-term behavior change. The interventions need to start earlier, be more consistent, and involve the whole family and community.',
    },
    {
      title: 'The Racial and Economic Opportunity Gap Demands Action',
      icon: '⚖️',
      content: 'Children from low-to-moderate-income families and communities of color are disproportionately affected by the lack of early financial education. They often attend schools with fewer resources, live in communities with fewer financial institutions, and grow up in households where money conversations are harder to start. Starting earlier helps level the playing field by giving every child foundational habits before systemic barriers compound.',
    },
    {
      title: 'Older Youth Are an Untapped Force for Change',
      icon: '🧑‍🤝‍🧑',
      content: 'High school and college students represent a powerful, largely overlooked resource in the financial education ecosystem. When engaged as mentors, educators, and ambassadors, they reinforce their own financial literacy, gain workforce skills, and create an intergenerational learning loop. Most organizations aren\'t leveraging this potential — Grow Good Daily is designed to make it central to the model.',
    },
    {
      title: 'Families Need Better Tools, Not More Lectures',
      icon: '🏠',
      content: 'Parents and caregivers are the single most powerful influence on a child\'s relationship with money, yet most feel unprepared or uncomfortable starting financial conversations. They don\'t need another webinar — they need simple, engaging, ready-to-use resources that make it easy to talk about money at home. That\'s what Grow Good Daily delivers: bedtime stories, songs, activities, and conversation starters that meet families where they are.',
    },
    {
      title: 'Early Financial Education Still Lacks Urgency and Awareness',
      icon: '📢',
      content: 'Despite decades of research supporting the importance of early habits, financial education for young children remains a niche conversation. It doesn\'t get the media attention, public policy focus, or philanthropic investment it deserves. Grow Good Daily exists in part to change that narrative — to make early-age financial education a mainstream expectation, not an afterthought.',
    },
    {
      title: 'Technology Has Created New Risks — and New Opportunities',
      icon: '📱',
      content: 'Today\'s children are exposed to digital payments, in-app purchases, and online advertising before they even enter kindergarten. The financial landscape they\'ll navigate is more complex than any previous generation\'s. But technology also offers unprecedented opportunities to reach children and families with engaging, scalable content. Now is the time to harness digital tools for good — before the gap widens further.',
    },
    {
      title: 'A Proven Foundation Already Exists',
      icon: '🏛️',
      content: 'Grow Good Daily isn\'t starting from scratch. It builds on 25+ years of trusted work through SammyRabbit.com and BedtimeMoneyHabits.com — platforms with established content, proven engagement, and real-world credibility. The resources are ready. The expertise is deep. What\'s needed now is the funding, partners, and community support to scale what already works.',
    },
  ];

  return (
    <main className="why-page" id="why-it-matters-page">
      <SEOHead
        title="Why It Matters — The Urgency of Early Financial Education"
        description="Discover why early financial education matters: 76% of Americans live paycheck to paycheck, yet most financial literacy programs start too late. Learn why Grow Good Daily is changing the timeline."
        canonical="https://growgooddaily.com/why-it-matters"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Why It Matters',
          description: 'The urgency of early financial education for children, families, and communities.',
          url: 'https://growgooddaily.com/why-it-matters',
          isPartOf: { '@type': 'WebSite', name: 'Grow Good Daily', url: 'https://growgooddaily.com' },
        }}
      />

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

      {/* Primary "Why Now" — Detailed Narrative */}
      <section className="section why-now-detail" id="why-now-detail">
        <div className="container">
          <AnimatedSection>
            <div className="why-now-detail__layout">
              <div className="why-now-detail__text">
                <span className="section__label">Why Now</span>
                <h2 className="section__title">The System is Backwards — and Children Are Paying the Price</h2>
                <p className="why-now-detail__lead">
                  For more than thirty years, financial education in the United States has been centered almost entirely on high school students and adults. The results have been negligible. 
                </p>
                <p>
                  Despite billions spent on financial literacy programs, over <strong>76% of Americans</strong> still live paycheck to paycheck at some point. Two out of three college students report anxiety about their finances. And fewer than one in four young adults feel confident making even basic financial decisions.
                </p>
                <p>
                  The problem is not a lack of programs — it's that the programs come too late. Research from Cambridge University demonstrates that children begin forming financial attitudes and habits <strong>as early as age three</strong>. By age seven, most core money behaviors are already set. Yet the overwhelming majority of interventions don't begin until high school — a full decade after the critical window has closed.
                </p>
                <p>
                  Meanwhile, the consequences compound. Young adults enter the workforce saddled with debt and lacking basic money management skills. Families struggle with conversations about finances. Communities — especially low-to-moderate-income communities and communities of color — carry the heaviest burden of this systemic failure.
                </p>
                <p>
                  <strong>This is why Grow Good Daily exists.</strong> Not to add another program to a crowded field, but to fundamentally redesign when, how, and through whom financial education reaches children. Starting earlier. Engaging youth as part of the solution. Equipping families with tools that actually work. And building a whole-community model that creates the consistent, reinforced conditions real change requires.
                </p>
                <p>
                  The window is open now. The research is clear. The resources exist. What's needed is the will, the investment, and the community to make it happen.
                </p>
              </div>
              <div className="why-now-detail__visual">
                <img src="/images/early-education.png" alt="Illustration representing the importance of starting financial education early with young children" />
                <div className="why-now-detail__callout">
                  <span className="why-now-detail__callout-number">Age 3–7</span>
                  <span className="why-now-detail__callout-text">The critical window when money habits are formed</span>
                </div>
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

      {/* Accordion — Additional Reasons */}
      <section className="section why-accordion-section" id="why-additional-reasons">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">Dig Deeper</span>
            <h2 className="section__title">Additional Reasons Why Now</h2>
            <p className="section__subtitle">
              The case for early financial education is overwhelming. Explore each reason in detail.
            </p>
          </AnimatedSection>
          <div className="why-accordion" id="why-accordion">
            {accordionReasons.map((reason, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className={`why-accordion__item ${openAccordion === i ? 'why-accordion__item--open' : ''}`}>
                  <button
                    className="why-accordion__header"
                    onClick={() => toggleAccordion(i)}
                    aria-expanded={openAccordion === i}
                    aria-controls={`accordion-panel-${i}`}
                    id={`accordion-header-${i}`}
                  >
                    <span className="why-accordion__icon">{reason.icon}</span>
                    <span className="why-accordion__title">{reason.title}</span>
                    <span className="why-accordion__chevron" aria-hidden="true">
                      {openAccordion === i ? '−' : '+'}
                    </span>
                  </button>
                  <div
                    className="why-accordion__panel"
                    id={`accordion-panel-${i}`}
                    role="region"
                    aria-labelledby={`accordion-header-${i}`}
                  >
                    <p>{reason.content}</p>
                  </div>
                </div>
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
