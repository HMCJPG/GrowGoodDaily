import { Link } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import './YouthStrategyPage.css';

export default function YouthStrategyPage() {
  const opportunities = [
    {
      num: 1,
      icon: '📚',
      title: 'Lead Financial Education Experiences in Your Community',
      desc: 'Help bring Grow Good Daily experiences to life for children, families, schools, after-school programs, and community groups.',
      items: [
        'Lead or assist with live financial education activities',
        'Support reading, singing, and discussion experiences for young children',
        'Help facilitate school, library, or community events',
        'Serve as a near-peer educator for younger students',
        'Help deliver family engagement experiences',
      ],
    },
    {
      num: 2,
      icon: '📣',
      title: 'Become a Community Ambassador or Student Spokesperson',
      desc: 'Represent Grow Good Daily in your school, city, campus, or online network.',
      items: [
        'Serve as a local ambassador for your community',
        'Promote programs, events, and campaigns',
        'Speak to students, educators, parents, or community partners',
        'Help recruit other student leaders and volunteers',
        'Share your experience and impact story',
      ],
    },
    {
      num: 3,
      icon: '📱',
      title: 'Support Awareness Campaigns Through Social Media and Digital Outreach',
      desc: 'Help Grow Good Daily spread positive messages and expand its reach.',
      items: [
        'Create and post social media content',
        'Help plan awareness campaigns',
        'Record short videos or testimonials',
        'Help promote events, initiatives, and calls to action',
        'Support digital storytelling and audience growth',
      ],
    },
    {
      num: 4,
      icon: '🎯',
      title: 'Join a Student Role Aligned with Your Interests and Career Goals',
      desc: 'Students can contribute in the area that best fits their strengths while building practical workforce skills.',
      items: [
        'Social media', 'Content creation', 'Blogging and writing',
        'Public relations and outreach', 'Research', 'Graphic design',
        'Video and multimedia', 'Website support',
        'List building and community outreach', 'Event planning',
        'Panel and roundtable organizing', 'Curriculum and activity development',
        'Youth engagement strategy', 'Partnership outreach',
      ],
      label: 'Possible role areas:',
    },
    {
      num: 5,
      icon: '💬',
      title: 'Be Part of the Student Feedback Circle',
      desc: 'Help shape the future of Grow Good Daily by sharing ideas, insights, and honest feedback.',
      items: [
        'Review programs, campaigns, and materials',
        'Give student perspective on what resonates with youth',
        'Test new ideas and experiences',
        'Suggest improvements to messaging, content, and design',
        'Help ensure programs stay relevant, engaging, and useful',
      ],
    },
    {
      num: 6,
      icon: '🗣️',
      title: 'Attend and Participate in Youth Roundtables',
      desc: 'Join conversations about leadership, financial literacy, opportunity, and issues affecting young people and families.',
      items: [
        'Share ideas and lived experience',
        'Help identify needs in your community',
        'Collaborate with other student leaders',
        'Help shape future initiatives and campaigns',
        'Build your voice, confidence, and network',
      ],
    },
    {
      num: 7,
      icon: '🎤',
      title: 'Attend the Guest Speaker and Career Exploration Series',
      desc: 'Learn from professionals, educators, entrepreneurs, and community leaders.',
      items: [
        'Gain exposure to different career paths',
        'Build professional connections',
        'Learn leadership and workplace skills',
        'Discover internship and job possibilities',
        'Explore how to turn purpose into impact',
      ],
      label: 'Possible benefits:',
    },
  ];

  const roleCategories = [
    {
      title: 'Leadership and Outreach',
      color: '#4CAF50',
      roles: ['Community Ambassador', 'Campus Ambassador', 'Student Spokesperson', 'Youth Advisory Member', 'Event Host or Facilitator', 'Workshop Assistant', 'Family Engagement Leader', 'Peer Mentor', 'Student Recruiter'],
    },
    {
      title: 'Communications and Media',
      color: '#F9A825',
      roles: ['Social Media Ambassador', 'Content Creator', 'Blogger or Youth Writer', 'Video Creator', 'Podcast or Interview Host', 'Public Relations Assistant', 'Email Outreach Assistant', 'Storytelling and Testimonial Lead'],
    },
    {
      title: 'Creative and Content',
      color: '#FF7043',
      roles: ['Graphic Design Assistant', 'Content Development Assistant', 'Curriculum Support Intern', 'Activity and Resource Creator', 'Branding Support Assistant', 'Presentation Design Assistant'],
    },
    {
      title: 'Research and Strategy',
      color: '#5C6BC0',
      roles: ['Research Assistant', 'Community Needs Assessment Assistant', 'Youth Trends Researcher', 'Partnership Research Assistant', 'Impact and Data Support Assistant', 'Program Evaluation Assistant'],
    },
    {
      title: 'Event and Program',
      color: '#2D8A4E',
      roles: ['Roundtable Coordinator', 'Panel Organizer', 'Guest Speaker Series Assistant', 'Community Event Coordinator', 'Volunteer Coordinator', 'Program Operations Assistant'],
    },
  ];

  const projectCategories = [
    {
      title: 'Community Projects',
      icon: '🏘️',
      projects: [
        'Organize a financial literacy reading event for children',
        'Help lead a savings-themed family workshop',
        'Support a school or library awareness campaign',
        'Recruit volunteers for a local Grow Good Daily initiative',
        'Help launch a local student ambassador team',
      ],
    },
    {
      title: 'Media and Awareness Projects',
      icon: '📱',
      projects: [
        'Create a month of social media content',
        'Produce short student spotlight videos',
        'Develop a digital awareness campaign around early financial literacy',
        'Write blog posts or student opinion pieces',
        'Build a community contact list for outreach',
      ],
    },
    {
      title: 'Research and Development Projects',
      icon: '🔬',
      projects: [
        'Research youth financial literacy needs in local communities',
        'Help identify schools, nonprofits, and community partners',
        'Gather student feedback on new content and programs',
        'Review successful youth leadership models',
        'Help map internship and workforce development opportunities',
      ],
    },
    {
      title: 'Events and Engagement Projects',
      icon: '🎉',
      projects: [
        'Plan a youth roundtable',
        'Help organize a guest speaker event',
        'Create a student-led panel discussion',
        'Support a fundraiser or awareness event',
        'Help run a community launch or kickoff event',
      ],
    },
  ];

  const tiers = [
    { num: 1, title: 'Volunteer', desc: 'A good entry point for students who want experience, service hours, and exposure.', icon: '🌱', color: '#4CAF50' },
    { num: 2, title: 'Leadership Role', desc: 'For students ready to take responsibility, represent the organization, and help lead projects.', icon: '⭐', color: '#F9A825' },
    { num: 3, title: 'Internship', desc: 'A structured experience focused on skill development, mentorship, and career readiness.', icon: '🎓', color: '#FF7043' },
    { num: 4, title: 'Paid Part-Time Role', desc: 'For students taking on ongoing responsibilities that support programs, outreach, content, or operations.', icon: '💼', color: '#2D8A4E' },
  ];

  const benefits = [
    'Build leadership and communication skills',
    'Gain real-world experience',
    'Strengthen resumes and college applications',
    'Explore career interests',
    'Develop workplace readiness',
    'Grow professional networks',
    'Make a meaningful difference in their communities',
    'Help younger children build healthy habits and brighter futures',
  ];

  return (
    <main className="youth-page" id="youth-strategy-page">
      {/* Hero */}
      <section className="page-hero" id="youth-hero">
        <div className="page-hero__bg">
          <div className="page-hero__gradient" style={{ background: 'linear-gradient(135deg, #1A2E1C 0%, #2D8A4E 40%, #F9A825 100%)' }}></div>
        </div>
        <div className="container page-hero__content">
          <span className="hero__badge animate-fade-up">Youth Strategy</span>
          <h1 className="page-hero__title animate-fade-up delay-1">
            Youth Workforce Pipeline and Global Network
          </h1>
          <p className="page-hero__subtitle animate-fade-up delay-2">
            Helping young leaders grow good in their communities, build real-world skills, and create pathways to opportunity.
          </p>
          <div className="btn-group animate-fade-up delay-3" style={{ justifyContent: 'center' }}>
            <Link to="/contact?interest=youth-strategy" className="btn btn--accent btn--lg" id="youth-hero-cta">
              Get Involved
            </Link>
            <a href="#youth-opportunities" className="btn btn--white btn--lg" id="youth-hero-explore">
              Explore Opportunities ↓
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section" id="youth-intro">
        <div className="container container--narrow text-center">
          <AnimatedSection>
            <span className="section__label">The Invitation</span>
            <h2 className="section__title">Join the Movement</h2>
            <p className="youth-intro__lead">
              Grow Good Daily invites high school and college students to become mentors, ambassadors, educators, creators, and leaders. Through structured volunteer roles, internships, leadership opportunities, and part-time jobs, students can help advance early-age financial literacy and other life-ready skills while building their own experience, confidence, and career readiness.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Opportunity Menu */}
      <section className="section section--alt" id="youth-opportunities">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">Get Started</span>
            <h2 className="section__title">Opportunity Menu for Students</h2>
            <p className="section__subtitle">
              Seven ways to make a difference, build your skills, and grow your future.
            </p>
          </AnimatedSection>
          <div className="youth-opps">
            {opportunities.map((opp, i) => (
              <AnimatedSection key={i} className="youth-opp" delay={i * 0.08}>
                <div className="youth-opp__header">
                  <div className="youth-opp__num">{opp.num}</div>
                  <div className="youth-opp__icon">{opp.icon}</div>
                </div>
                <h3 className="youth-opp__title">{opp.title}</h3>
                <p className="youth-opp__desc">{opp.desc}</p>
                <p className="youth-opp__label">{opp.label || 'Possible ways to participate:'}</p>
                <ul className="youth-opp__list">
                  {opp.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Student Roles */}
      <section className="section" id="youth-roles">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">Find Your Fit</span>
            <h2 className="section__title">Sample Student Roles</h2>
            <p className="section__subtitle">
              A wide range of roles to match your strengths, interests, and career goals.
            </p>
          </AnimatedSection>
          <div className="youth-roles__grid">
            {roleCategories.map((cat, i) => (
              <AnimatedSection key={i} className="youth-role-cat" delay={i * 0.1}>
                <h3 className="youth-role-cat__title" style={{ borderColor: cat.color }}>
                  {cat.title} Roles
                </h3>
                <ul className="youth-role-cat__list">
                  {cat.roles.map((role, j) => (
                    <li key={j}>
                      <span className="youth-role-cat__dot" style={{ background: cat.color }}></span>
                      {role}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Projects */}
      <section className="section section--alt" id="youth-projects">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">Real Work, Real Impact</span>
            <h2 className="section__title">Sample Projects Students Can Work On</h2>
          </AnimatedSection>
          <div className="youth-projects__grid">
            {projectCategories.map((cat, i) => (
              <AnimatedSection key={i} className="youth-project-cat" delay={i * 0.1}>
                <div className="youth-project-cat__icon">{cat.icon}</div>
                <h3>{cat.title}</h3>
                <ul>
                  {cat.projects.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Participate - Tiers */}
      <section className="section" id="youth-tiers">
        <div className="container">
          <AnimatedSection className="text-center">
            <span className="section__label">Your Pathway</span>
            <h2 className="section__title">Ways Students Can Participate</h2>
            <p className="section__subtitle">
              A clear pathway from first involvement to ongoing leadership.
            </p>
          </AnimatedSection>
          <div className="youth-tiers__grid">
            {tiers.map((tier, i) => (
              <AnimatedSection key={i} className="youth-tier" delay={i * 0.12}>
                <div className="youth-tier__badge" style={{ background: tier.color }}>{tier.icon}</div>
                <div className="youth-tier__num">Tier {tier.num}</div>
                <h3>{tier.title}</h3>
                <p>{tier.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section section--dark" id="youth-benefits">
        <div className="container container--narrow text-center">
          <AnimatedSection>
            <span className="section__label">Why Join</span>
            <h2 className="section__title">Benefits to Students</h2>
          </AnimatedSection>
          <div className="youth-benefits__grid">
            {benefits.map((b, i) => (
              <AnimatedSection key={i} className="youth-benefit" delay={i * 0.06}>
                <span className="youth-benefit__check">✓</span>
                <span>{b}</span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--warm text-center" id="youth-cta">
        <div className="container container--narrow">
          <AnimatedSection>
            <h2 className="section__title">Ready to Grow Good?</h2>
            <p className="section__subtitle" style={{ margin: '0 auto var(--space-2xl)' }}>
              Whether you want to volunteer, lead, intern, or work, there is a place for you at Grow Good Daily.
            </p>
            <div className="btn-group" style={{ justifyContent: 'center' }}>
              <Link to="/contact?interest=youth-strategy" className="btn btn--primary btn--lg" id="youth-cta-contact">
                Get Involved Today
              </Link>
              <Link to="/founding-partners" className="btn btn--secondary btn--lg" id="youth-cta-support">
                Ways to Support →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
