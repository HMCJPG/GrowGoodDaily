import { Link } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import './VisionPage.css';

export default function VisionPage() {
  return (
    <main className="vision-page" id="vision-page">
      {/* Page Hero */}
      <section className="page-hero" id="vision-hero">
        <div className="page-hero__bg">
          <div className="page-hero__gradient"></div>
        </div>
        <div className="container page-hero__content">
          <span className="hero__badge animate-fade-up">Our Vision</span>
          <h1 className="page-hero__title animate-fade-up delay-1">
            Redesigning the Starting Line for Economic Opportunity
          </h1>
          <p className="page-hero__subtitle animate-fade-up delay-2">
            The full story behind Grow Good Daily: why we exist, what we believe, and where we're headed.
          </p>
        </div>
      </section>

      {/* The Story */}
      <section className="section" id="vision-story">
        <div className="container container--narrow">
          <AnimatedSection>
            <span className="section__label">The Story</span>
            <h2 className="section__title">Why Grow Good Daily Exists</h2>
            <div className="vision-prose">
              <p className="vision-prose__lead">
                Financial education starts too late. Grow Good Daily is being created to help children, families, and communities start earlier and build stronger futures together.
              </p>
              <p>
                For decades, financial education has largely targeted older teens and adults, arriving after habits, attitudes, and beliefs about money have already taken root. By the time many young people encounter their first formal lesson about money, they have already absorbed years of messaging, behavior, and assumptions from the world around them.
              </p>
              <p>
                Grow Good Daily was conceived from a simple but powerful insight: the earlier we start, the more lasting the impact. Research consistently shows that children begin forming attitudes about money and financial behaviors as young as ages three to five. Yet most financial education efforts still begin years later, often in high school or college.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="section section--alt" id="vision-beliefs">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">What We Believe</span>
            <h2 className="section__title">Core Beliefs</h2>
          </AnimatedSection>
          <div className="vision-beliefs__grid">
            <AnimatedSection className="vision-belief" delay={0.1}>
              <div className="vision-belief__num">01</div>
              <h3>Early Matters Most</h3>
              <p>The most impressionable years hold the greatest potential for building healthy financial habits that last a lifetime.</p>
            </AnimatedSection>
            <AnimatedSection className="vision-belief" delay={0.2}>
              <div className="vision-belief__num">02</div>
              <h3>Youth Are Part of the Solution</h3>
              <p>Older youth can be powerful mentors and ambassadors, creating an intergenerational learning loop that benefits everyone.</p>
            </AnimatedSection>
            <AnimatedSection className="vision-belief" delay={0.3}>
              <div className="vision-belief__num">03</div>
              <h3>Families Are the Foundation</h3>
              <p>When families have the tools to start money conversations earlier, the ripple effect extends across generations.</p>
            </AnimatedSection>
            <AnimatedSection className="vision-belief" delay={0.4}>
              <div className="vision-belief__num">04</div>
              <h3>Communities Hold the Key</h3>
              <p>Schools, organizations, and local leaders are the channels that can bring financial education to every child.</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Five-Year Vision */}
      <section className="section" id="vision-five-year">
        <div className="container">
          <AnimatedSection>
            <div className="vision-fiveyear">
              <div className="vision-fiveyear__text">
                <span className="section__label">Looking Ahead</span>
                <h2 className="section__title">The Five-Year Vision</h2>
                <p>
                  Over the next five years, Grow Good Daily aims to build a national model for earlier financial education. Starting with a $250,000 year-one goal, the vision scales to a $5 million five-year investment in children, families, and communities.
                </p>
                <p>
                  This is not just about teaching children how to count money. It is about building a generation of young people who grow up understanding that their financial choices matter, that saving is a habit worth building, and that their futures are full of possibility.
                </p>
                <div className="vision-fiveyear__stats">
                  <div className="vision-fiveyear__stat">
                    <span className="vision-fiveyear__stat-num">$5M</span>
                    <span className="vision-fiveyear__stat-label">Five-Year Investment</span>
                  </div>
                  <div className="vision-fiveyear__stat">
                    <span className="vision-fiveyear__stat-num">$250K</span>
                    <span className="vision-fiveyear__stat-label">Year-One Goal</span>
                  </div>
                </div>
              </div>
              <div className="vision-fiveyear__image">
                <img src="/images/community-impact.png" alt="Vibrant community scene showing the positive impact of financial education on families and children" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--dark text-center" id="vision-cta">
        <div className="container container--narrow">
          <AnimatedSection>
            <h2 className="section__title">Ready to Be Part of This Vision?</h2>
            <p className="section__subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>
              We are building something meaningful. Join us at the beginning.
            </p>
            <div className="btn-group" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn--accent btn--lg" id="vision-cta-button">
                Become a Founding Supporter
              </Link>

            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
