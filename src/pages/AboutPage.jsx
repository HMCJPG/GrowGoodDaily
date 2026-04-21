import { Link } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import './AboutPage.css';

export default function AboutPage() {
  const values = [
    { title: 'Access', text: 'Every child deserves a strong financial foundation, regardless of zip code, background, or circumstance. We are committed to reaching all families and communities, with a priority on those who need these tools most.' },
    { title: 'Start Early', text: 'The earlier good habits take root, the stronger they grow. We believe early childhood is the most powerful and most overlooked window of opportunity in financial education.' },
    { title: 'Habits', text: 'Habits do not discriminate. The consistent practice of good ones creates good lives for anyone and everyone who practices them.' },
    { title: 'Family', text: 'No force in a child\'s life is more powerful than family, however that family is constructed. Empowering families with tools that strengthen the household is essential to building independence, closing gaps, and creating lasting change.' },
    { title: 'Every Day Matters', text: 'Small, consistent actions create lasting change. We help children, families, and communities build the daily habits that compound into a lifetime of opportunity.' },
    { title: 'Intergenerational Impact', text: 'We believe in the power of every generation to teach and inspire the next. When older youth lead and younger children learn, everyone grows.' },
    { title: 'Joy and Imagination', text: 'Learning works best when it feels like play. We bring energy, creativity, and fun to financial education so children lean in rather than tune out.' },
    { title: 'Community', text: 'No family should navigate financial education alone. We build bridges between children, families, educators, youth leaders, and communities so that growing good becomes a shared and celebrated endeavor.' },
  ];

  return (
    <main className="about-page" id="about-page">
      {/* Page Hero */}
      <section className="page-hero" id="about-hero">
        <div className="page-hero__bg">
          <div className="page-hero__gradient" style={{ background: 'linear-gradient(135deg, #1A2E1C 0%, #2D8A4E 60%, #1B5E20 100%)' }}></div>
        </div>
        <div className="container page-hero__content">
          <span className="hero__badge animate-fade-up">About Grow Good Daily</span>
          <h1 className="page-hero__title animate-fade-up delay-1">
            Start Early. Dream Big. Grow Good.
          </h1>
          <p className="page-hero__subtitle animate-fade-up delay-2">
            Building the financial habits, knowledge, attitudes, and aspirations of young children, one day at a time.
          </p>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="section" id="about-vision">
        <div className="container container--narrow">
          <AnimatedSection>
            <div className="about-statement">
              <span className="section__label">Vision Statement</span>
              <h2 className="section__title">Our Vision</h2>
              <p className="about-statement__text">
                A world where every child, regardless of zip code, grows up with early access to the knowledge, habits, and opportunities to build financial confidence, pursue their dreams, and create a secure and independent future.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section section--alt" id="about-mission">
        <div className="container container--narrow">
          <AnimatedSection>
            <div className="about-statement">
              <span className="section__label">Mission Statement</span>
              <h2 className="section__title">Start Early. Dream Big. Grow Good.</h2>
              <p className="about-statement__text">
                Grow Good Daily builds the financial habits, knowledge, attitudes, and aspirations of young children by equipping families, educators, youth leaders, and community enterprises with engaging, easy-to-use tools so that every generation is better prepared to achieve financial well-being, independence, and the confidence to pursue their dreams.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section" id="about-philosophy">
        <div className="container container--narrow">
          <AnimatedSection>
            <div className="about-philosophy">
              <span className="section__label">The Grow Good Daily Philosophy</span>
              <h2 className="section__title">Tiny Steps. Enormous Change.</h2>
              <p className="about-philosophy__lead">
                The most powerful forces in the world don't announce themselves. They show up quietly, every day, and do the same small thing over and over until one day the world looks completely different.
              </p>
              <p>A seed. A habit. A child who learns early what money really means.</p>
              <p>
                Grow Good Daily is built on a simple belief: tiny steps, repeated reliably, create enormous change. Not someday. Over time. On purpose.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What Does It Mean to Grow Good */}
      <section className="section section--warm" id="about-grow-good">
        <div className="container container--narrow">
          <AnimatedSection>
            <div className="about-grow-good">
              <h2 className="section__title">What Does It Mean to Grow Good?</h2>
              <p className="about-grow-good__lead">
                To grow good means to do something positive for yourself, for someone else, or for your community, no matter how small the action. Then make it a habit by showing up again tomorrow, and the day after that.
              </p>
              <p>
                Growing good can be any positive action. But at Grow Good Daily, our primary focus is on growing good money habits: the small, consistent choices that, over time, build confidence, security, and the confidence to pursue your dreams.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Values */}
      <section className="section" id="about-values">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">Our Values</span>
            <h2 className="section__title">What We Stand For</h2>
          </AnimatedSection>
          <div className="about-values__grid">
            {values.map((item, i) => (
              <AnimatedSection key={i} className="about-values__card" delay={i * 0.08}>
                <h3 className="about-values__card-title">{item.title}</h3>
                <p>{item.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="section section--alt" id="about-profile">
        <div className="container">
          <AnimatedSection>
            <div className="about-profile">
              <div className="about-profile__image">
                <div className="about-profile__badges">
                  <span className="about-badge">25+ Years in Financial Education</span>
                  <span className="about-badge">Creator of Sammy Rabbit</span>
                  <span className="about-badge">Published Author &amp; Speaker</span>
                </div>
              </div>
              <div className="about-profile__text">
                <span className="section__label">Meet the Founder</span>
                <h2 className="section__title">A Life Dedicated to Financial Education</h2>
                <p className="about-profile__lead">
                  Sam X Renick has spent over 25 years on a singular mission: helping children and families build stronger financial futures, one good habit at a time.
                </p>
                <p>
                  As the creator of Sammy Rabbit, one of the most recognized characters in children's financial education, Sam has developed award-winning books, songs, activities, and curricula that have reached children, parents, educators, and communities across the country and around the world.
                </p>
                <p>
                  Through SammyRabbit.com and BedtimeMoneyHabits.com, Sam has built platforms that make financial education accessible, engaging, and family-centered. These are not theoretical concepts; they are proven tools, tested and refined over decades of real-world experience.
                </p>
                <p>
                  Grow Good Daily represents the next evolution of that work: a full nonprofit model designed to take what has been proven at the individual and family level and scale it to classrooms, communities, and an entire generation, starting earlier, reaching further, and building opportunity where it matters most.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="section section--dark" id="about-founder-quote">
        <div className="container container--narrow text-center">
          <AnimatedSection>
            <blockquote className="about-blockquote">
              <p>
                "The habits children build before age seven will shape the financial decisions they make at ages twenty-seven, forty-seven, and sixty-seven. That's not a reason to worry. It's a reason to start the intentional financial education of children early."
              </p>
              <cite>- Sam X Renick, Founder</cite>
            </blockquote>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section text-center" id="about-cta">
        <div className="container container--narrow">
          <AnimatedSection>
            <h2 className="section__title">Build With Sam</h2>
            <p className="section__subtitle" style={{ margin: '0 auto var(--space-2xl)' }}>
              Whether you want to collaborate, contribute, or simply connect, Sam is eager to hear from passionate people who share this vision.
            </p>
            <div className="btn-group" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn--accent btn--lg" id="about-cta-contact">
                Get In Touch
              </Link>
              <Link to="/founding-partners" className="btn btn--primary btn--lg" id="about-cta-partners">
                Ways to Support →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
