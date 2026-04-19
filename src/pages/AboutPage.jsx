import { Link } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import './AboutPage.css';

export default function AboutPage() {
  const milestones = [
    { year: '2000s', text: 'Created Sammy Rabbit, a beloved character teaching children about money through stories and songs' },
    { year: '2010s', text: 'Built SammyRabbit.com into a trusted platform for early financial education' },
    { year: '2020s', text: 'Launched BedtimeMoneyHabits.com, making financial learning a family bedtime activity' },
    { year: 'Now', text: 'Envisioning Grow Good Daily as the next evolution: a full nonprofit model for systemic change' },
  ];

  return (
    <main className="about-page" id="about-page">
      {/* Page Hero */}
      <section className="page-hero" id="about-hero">
        <div className="page-hero__bg">
          <div className="page-hero__gradient" style={{ background: 'linear-gradient(135deg, #1A2E1C 0%, #2D8A4E 60%, #1B5E20 100%)' }}></div>
        </div>
        <div className="container page-hero__content">
          <span className="hero__badge animate-fade-up">The Founder</span>
          <h1 className="page-hero__title animate-fade-up delay-1">
            About Sam X Renick
          </h1>
          <p className="page-hero__subtitle animate-fade-up delay-2">
            A 25-year journey dedicated to helping children build healthy money habits, stronger confidence, and bigger futures.
          </p>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="section" id="about-profile">
        <div className="container">
          <AnimatedSection>
            <div className="about-profile">
              <div className="about-profile__image">
                <div className="about-profile__badges">
                  <span className="about-badge">25+ Years in Financial Education</span>
                  <span className="about-badge">Creator of Sammy Rabbit</span>
                  <span className="about-badge">Published Author & Speaker</span>
                </div>
              </div>
              <div className="about-profile__text">
                <span className="section__label">Meet The Founder</span>
                <h2 className="section__title">A Life Dedicated to Financial Education</h2>
                <p className="about-profile__lead">
                  Sam X Renick has spent over 25 years on a singular mission: helping children and families build stronger financial futures, one good habit at a time.
                </p>
                <p>
                  As the creator of Sammy Rabbit, one of the most recognized characters in children's financial education, Sam has developed books, songs, activities, and curricula that have reached thousands of children, parents, educators, and communities.
                </p>
                <p>
                  Through SammyRabbit.com and BedtimeMoneyHabits.com, Sam has built platforms that make financial education accessible, engaging, and family-centered. These are not theoretical concepts; they are proven tools, tested over decades.
                </p>
                <p>
                  Grow Good Daily represents the next evolution of this work: a vision for a full nonprofit model that can take what has been proven at the individual and family level and scale it to classrooms, communities, and an entire generation.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="section section--warm" id="about-note">
        <div className="container container--narrow">
          <AnimatedSection>
            <div className="about-note">
              <div className="about-note__quote">"</div>
              <h2 className="about-note__title">A Note from Sam</h2>
              <p>
                I have spent my career watching what happens when children are given the chance to learn about money early. The change is remarkable. Their confidence grows. Their families start talking. Their futures get brighter.
              </p>
              <p>
                But I have also seen how many children never get that chance. Financial education still starts too late for too many. The most impressionable years are too often the most overlooked years.
              </p>
              <p>
                Grow Good Daily is my attempt to change that equation. Not alone, but with a community of people who believe, as I do, that every child deserves a strong start.
              </p>
              <p>
                If this vision speaks to you, I would love to hear from you. This is just the beginning.
              </p>
              <div className="about-note__signature">
                <span className="about-note__name">Sam X Renick</span>
                <span className="about-note__role">Founder, Grow Good Daily</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Journey / Milestones */}
      <section className="section" id="about-journey">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">The Journey</span>
            <h2 className="section__title">25 Years of Building</h2>
          </AnimatedSection>
          <div className="about-timeline">
            {milestones.map((item, i) => (
              <AnimatedSection key={i} className="about-timeline__item" delay={i * 0.12}>
                <div className="about-timeline__marker">
                  <span className="about-timeline__year">{item.year}</span>
                  <div className="about-timeline__dot"></div>
                </div>
                <div className="about-timeline__content">
                  <p>{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--dark text-center" id="about-cta">
        <div className="container container--narrow">
          <AnimatedSection>
            <h2 className="section__title">Build With Sam</h2>
            <p className="section__subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Whether you want to collaborate, contribute, or simply connect, Sam is eager to hear from passionate people who share this vision.
            </p>
            <div className="btn-group" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn--accent btn--lg" id="about-cta-contact">
                Get In Touch
              </Link>
              <Link to="/founding-partners" className="btn btn--white btn--lg" id="about-cta-partners">
                Ways to Support →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
