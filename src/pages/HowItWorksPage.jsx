import { Link } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import './HowItWorksPage.css';

export default function HowItWorksPage() {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Early Childhood Foundation',
      icon: '🌱',
      color: '#4CAF50',
      items: [
        'Age-appropriate storybooks, songs, and activities introduce saving, sharing, and smart choices',
        'Engaging characters like Sammy Rabbit make financial concepts relatable and fun',
        'Curriculum designed for preschool through early elementary classrooms',
        'Take-home materials extend learning into the family environment',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Youth Mentorship and Leadership',
      icon: '🤝',
      color: '#F9A825',
      items: [
        'Older youth (teens) are trained as financial literacy mentors and ambassadors',
        'Student workforce opportunities provide real skills and real experience',
        'Teens teach younger children, reinforcing their own learning while building leadership',
        'Creates a pipeline of youth who are prepared for economic opportunity',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Family and Educator Empowerment',
      icon: '💡',
      color: '#FF7043',
      items: [
        'Parents and caregivers receive practical tools for starting money conversations',
        'Teachers get ready-to-use classroom resources and professional development',
        'Community leaders gain access to programming they can deploy locally',
        'Digital resources make it easy to get started from anywhere',
      ],
    },
    {
      phase: 'Phase 4',
      title: 'Community Scale and Impact',
      icon: '🏘️',
      color: '#2D8A4E',
      items: [
        'Partnerships with schools, libraries, and youth-serving organizations expand reach',
        'Online platforms and campaigns reach hundreds of thousands',
        'Book and curriculum giveaways put resources directly in hands that need them',
        'Measurable outcomes track progress toward real community impact',
      ],
    },
  ];

  return (
    <main className="how-page" id="how-it-works-page">
      {/* Page Hero */}
      <section className="page-hero" id="how-hero">
        <div className="page-hero__bg">
          <div className="page-hero__gradient" style={{ background: 'linear-gradient(135deg, #1A2E1C 0%, #1B5E20 50%, #4CAF50 100%)' }}></div>
        </div>
        <div className="container page-hero__content">
          <span className="hero__badge animate-fade-up">Our Model</span>
          <h1 className="page-hero__title animate-fade-up delay-1">
            An Intergenerational Opportunity Model
          </h1>
          <p className="page-hero__subtitle animate-fade-up delay-2">
            A clear, connected approach that starts with young children and builds outward through youth, families, and communities.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="section" id="how-overview">
        <div className="container container--narrow text-center">
          <AnimatedSection>
            <span className="section__label">The Approach</span>
            <h2 className="section__title">Simple Steps, Lasting Change</h2>
            <p className="section__subtitle" style={{ margin: '0 auto' }}>
              Grow Good Daily's model connects four essential layers. Each one strengthens the others, creating a cycle of impact that grows over time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Visual Flow */}
      <section className="section section--alt how-flow" id="how-flow">
        <div className="container">
          <div className="how-flow__steps">
            <AnimatedSection className="how-flow__step" delay={0}>
              <div className="how-flow__step-circle" style={{ background: 'linear-gradient(135deg, #E8F5E9, #4CAF50)' }}>👶</div>
              <h3>Children Build Habits Early</h3>
              <p>Age-appropriate tools and rewards help young children learn and practice foundational money habits so they are able to make smart choices and build bright futures!</p>
            </AnimatedSection>
            <div className="how-flow__arrow">→</div>
            <AnimatedSection className="how-flow__step" delay={0.15}>
              <div className="how-flow__step-circle" style={{ background: 'linear-gradient(135deg, #FFF8E1, #F9A825)' }}>🎓</div>
              <h3>Older Youth Teach, Mentor, and Lead</h3>
              <p>In teaching and advocating early age personal finance, teens and young adults gain workforce skills and deepen their own financial literacy.</p>
            </AnimatedSection>
            <div className="how-flow__arrow">→</div>
            <AnimatedSection className="how-flow__step" delay={0.3}>
              <div className="how-flow__step-circle" style={{ background: 'linear-gradient(135deg, #FFF3E0, #FF7043)' }}>👨‍👩‍👧</div>
              <h3>Parents and Teachers Get Practical Tools</h3>
              <p>Parents and educators receive resources that make money conversations easy to start and keep going.</p>
            </AnimatedSection>
            <div className="how-flow__arrow">→</div>
            <AnimatedSection className="how-flow__step" delay={0.45}>
              <div className="how-flow__step-circle" style={{ background: 'linear-gradient(135deg, #E8F5E9, #2D8A4E)' }}>🏘️</div>
              <h3>Communities Grow Stronger</h3>
              <p>We unite children, youth, and mentors in a shared mission to master money. This collaborative model transforms individual knowledge into collective strength, ensuring a brighter, more secure future for the whole community.</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Detailed Phases */}
      <section className="section" id="how-phases">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">In Detail</span>
            <h2 className="section__title">The Four Phases</h2>
          </AnimatedSection>
          <div className="how-phases">
            {phases.map((phase, i) => (
              <AnimatedSection key={i} className="how-phase" delay={i * 0.1}>
                <div className="how-phase__header">
                  <div className="how-phase__icon" style={{ borderColor: phase.color }}>{phase.icon}</div>
                  <div>
                    <span className="how-phase__label" style={{ color: phase.color }}>{phase.phase}</span>
                    <h3 className="how-phase__title">{phase.title}</h3>
                  </div>
                </div>
                <ul className="how-phase__list">
                  {phase.items.map((item, j) => (
                    <li key={j}>
                      <span className="how-phase__bullet" style={{ background: phase.color }}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Image break */}
      <section className="section section--warm" id="how-image-break">
        <div className="container">
          <AnimatedSection>
            <div className="how-image-section">
              <img src="/images/youth-mentoring.png" alt="Older teenagers mentoring younger children about financial literacy in a warm classroom setting" />
              <div className="how-image-section__text">
                <h2>Youth Are at the Heart of Our Model</h2>
                <p>
                  By engaging older youth as mentors and ambassadors, we create a powerful intergenerational learning loop. Teens reinforce their own financial knowledge while gaining leadership experience, workforce skills, and a sense of purpose.
                </p>
                <div className="btn-group">
                  <Link to="/founding-partners" className="btn btn--primary" id="how-youth-cta">
                    Support Youth Jobs →
                  </Link>
                  <Link to="/youth-strategy" className="btn btn--secondary" id="how-youth-strategy">
                    Youth Strategy →
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--dark text-center" id="how-cta">
        <div className="container container--narrow">
          <AnimatedSection>
            <h2 className="section__title">Ready to Help Build This Model?</h2>
            <p className="section__subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Whether you want to fund, partner, or advise, there is a role for you.
            </p>
            <div className="btn-group" style={{ justifyContent: 'center' }}>
              <Link to="/founding-partners" className="btn btn--accent btn--lg" id="how-cta-partners">
                Becoming a Founding Supporter
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
